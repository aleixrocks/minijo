let
  nixpkgs = import <nixpkgs> {overlays=[overlay1];};

  overlay1 = self: super: # self is the new, super is the old
  {
    hello_from_func = super.callPackage ./hello_from_func.nix { opt=3; };
    middle-man = super.callPackage ./middle-man.nix {};
  };

in nixpkgs

