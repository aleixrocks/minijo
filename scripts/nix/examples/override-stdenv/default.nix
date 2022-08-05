let
  nixpkgs = import <nixpkgs> {overlays=[overlay1];};

  overlay1 = self: super: # self is the new, super is the old
  {
    stdenv = super.withCFlags [ "-fno-omit-frame-pointer" ] super.stdenv;                                                       
  };

in nixpkgs

