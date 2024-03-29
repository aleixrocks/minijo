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

    # override glibc example
    #
    #glibc = super.glibc.overrideAttrs (oldAttrs: rec {
    #   version = "2.27";
    #   name = "glibc-${version}";
    #   src = builtins.fetchurl {
    #       url    = "https://ftp.gnu.org/gnu/glibc/glibc-${version}.tar.xz";
    #       sha256 = "0wpwq7gsm7sd6ysidv0z575ckqdg13cr2njyfgrbgh4f65adwwji";
    #   };
    #});

    # the original libsystemtap stdenv depends on packages that depend on the
    # glibc, including fetchurl which is tricky. We need an offline
    # libsystemtap. This version only has the systemtap headers but
    # sys/sdt-generic.h has been hardcoded, it should be generated with
    # configure which we skip here.
    libsystemtap-headers = super.callPackage ./libsystemtap-headers { stdenv = super.glibc.stdenv; };

    # compile glibc with systemtap support
    glibc = super.glibc.overrideAttrs (oldAttrs: {
      configureFlags = oldAttrs.configureFlags ++ [ "--enable-systemtap" ];
      #buildInputs = oldAttrs.buildInputs ++ [ self.libsystemtap-headers ];
      buildInputs = oldAttrs.buildInputs ++ [ self.libsystemtap-headers ];
    });

    # to try to change the compiler that compiles the glibc, I tried by
    # overriding the glibc stdenv but this does not work due to a recursive
    # stdenv dependency between glibc and stdenv. glibc is compiled with a
    # boostrap stdenv (type glibc.stdenv in nix repl).  On the other hand, the
    # current stdenv depends on the current glibc. We can't just force the
    # glibc stdenv to point to the current stdenv!
    #
    #glibc = super.glibc.override {
    #  stdenv = super.gcc12Stdenv;
    #}

    # However, it works if we do not override the current glibc by giving it
    # another name. But this is useless because no package would use this
    # version.
    #glibc_potato = super.glibc.override {
    #  stdenv = super.gcc12Stdenv;
    #}
    
  };

in nixpkgs

