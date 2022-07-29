# The reader should notice a magic thing happening. We're defining
# pkgs in terms of callPackage, and callPackage in terms of pkgs.
# That magic is possible thanks to lazy evaluation:
# builtins.intersectAttrs doesn't need to know the values in
# allPkgs in order to perform intersection, only the keys that do
# not require callPackage evaluation.

let
  nixpkgs = import <nixpkgs> {};
  allPkgs = nixpkgs // pkgs;

  makeOverridable = f: args:
    let
      origRes = f args;
    in
      origRes // {myOverride = newArgs: makeOverridable f (args // newArgs); };

  callPackage = path: overrides:
  let 
    f = if builtins.isPath path then import path else path;
    in makeOverridable f ((builtins.intersectAttrs (builtins.functionArgs f) allPkgs) // overrides);

  pkgs = {
    mkDerivation = import ./autotools.nix nixpkgs;
    hello = callPackage ./hello.nix { }; 
    graphviz = callPackage ./graphviz.nix { } ;
    graphvizcore = callPackage ./graphviz.nix { gdSupport = false; };
  };
in pkgs
