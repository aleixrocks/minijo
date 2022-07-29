let
  nixpkgs = import <nixpkgs> {overlays=[overlay1];};

  overlay1 = self: super: # self is the new, super is the old
  {
    #graphviz = super.graphviz.override { xorg = null; };
    hello_from_func_O0 = super.callPackage ./hello_from_func.nix { opt=0; };
    hello_from_func_O3 = super.callPackage ./hello_from_func.nix { opt=3; };
    hello_from_func_O4 = super.callPackage ./hello_from_func.nix { opt=4; };
  };

in nixpkgs

