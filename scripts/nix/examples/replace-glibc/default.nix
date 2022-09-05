let
  nixpkgs = import <nixpkgs> {overlays=[overlay1];};
  removePathFromList = path: elem: if (builtins.baseNameOf elem) == (builtins.baseNameOf path) then false else true;
  removeGlibcPatch = removePathFromList ./2.35-master.patch.gz;

  overlay1 = self: super: # self is the new, super is the old
  {
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


    # change the glibc source for a local glibc. Be aware that the src
    # attribute must point to a directory named ("glibc-2.*" adapting the
    # version accordingly). That's because the nickpkgs glibc postInstall hook
    # refers to the directory "../glibc-2.*" and it will end with error
    # "ambiguous redirect" if not named properly. See
    # <nixpkgs>/pkgs/development/libraries/glibc/common.nix.
    #
    # To generate a glibc source, you can clone the glibc source from the
    # official repos or get the nixpkgs one:
    #   nix-shell -A glibc
    #   unpackPhase
    #   ls glibc-2.35
    #   exit
    #
    # Note that we are removing a glibc patch. The glibc community only
    # releases tarballs for the first release of a version, but on their github
    # they continue to update in the branch release/2.35/master. At boostrap,
    # nixpkgs cannot use git to fetch the latest glibc version, so what they do
    # is to pregenerate a patch between the tag glibc-2.35 and the newest
    # release/2.35/master. Then they apply the patch on top of the fetches
    # tarball 2.35 (corresponding to the tag glibc-2.35). In this case, I'm
    # assuming that the src attribute points to a git repo with the branch
    # release/2.35/master, which does not need the patch. Therefore, we remove
    # it here.

    glibc = super.glibc.overrideAttrs (oldAttrs: {
      src = /home/aleix/bsc/projects/sched_coop/taglibc/glibc-2.35;
      patches = builtins.filter removeGlibcPatch oldAttrs.patches;
    });
  };

in nixpkgs

