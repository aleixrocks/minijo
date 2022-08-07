let
  nixpkgs = import <nixpkgs> {overlays=[overlay1];};

  overlay1 = self: super: # self is the new, super is the old
  {
    # to build the glibc with systemtap support we need a compiler newer than
    # the default shipped in bootstrapTools (the default triggers a gcc bug).
    # To change the compiler in boostrapTools we need to generate it first, and
    # then modify nixpkgs to use it instead of downloading it from the nix
    # servers. The generated boostrapTools packs the current gcc in nixpkgs
    # which at the time of writting this is gcc 11.
    # To generate a boostrapTools package move to nixpkgs and use the command:
    #    nix build -f ./pkgs/stdenv/linux/make-bootstrap-tools.nix bootstrapFiles
    # then change the path to point to the generated tar.gz in:
    #    pkgs/stdenv/linux/bootstrap-files/x86_64.nix
    # finally, update your NIX_PATH nixpkgs entry to point to your custom
    # nixpkgs repository


    # build all with frame pointer support for bpf user-space stack traces
    stdenv = super.withCFlags [ "-fno-omit-frame-pointer" ] super.stdenv;                                                       

    # the original libsystemtap stdenv depends on packages that depend on the
    # glibc, including fetchurl which is tricky. We need an offline
    # libsystemtap. This version only has the systemtap headers but
    # sys/sdt-generic.h has been hardcoded, it should be generated with
    # configure which we skip here.
    libsystemtap-headers = super.callPackage ./libsystemtap-headers { stdenv = super.glibc.stdenv; };

    # this libsystemtap should also work.  this overrided libsystemtap removes
    # all dependencies and rebuilds a patched configure. we don't want to
    # compile, we just want the generated header file and then copy the
    # headers. I had to patch configure because it complained if no python and
    # other packages where found, althoug they where not needed to just
    # generate that config file. This needs the systemtap sources because it
    # cannot use fetchurl due to a dependency with the glibc (nothing before
    # the glibc can use it see comment under pkgs/development/libraries/glibc/common.nix)
    # to get them, use nix-shell $(nix-instantiate '<nixpkgs>' -A libsystemtap)
    # and "unpackPhase".
    libsystemtap-patched = super.libsystemtap.overrideAttrs(oldAttrs: {
      src = ./systemtap;
      patches = [ ./libsystemtap.patch ];
      nativeBuildInputs = [ super.autoreconfHook ];
      configureFlags = [ "--without-python2-probes" "--without-python3-probes" "--disable-translator" ];
    });

    # compile glibc with systemtap support
    glibc = super.glibc.overrideAttrs (oldAttrs: {
      configureFlags = oldAttrs.configureFlags ++ [ "--enable-systemtap" ];
      #buildInputs = oldAttrs.buildInputs ++ [ self.libsystemtap-headers ];
      buildInputs = oldAttrs.buildInputs ++ [ self.libsystemtap-patched ];
    });
    
  };

in nixpkgs

