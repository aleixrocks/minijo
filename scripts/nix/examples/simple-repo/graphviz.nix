let
  pkgs = import <nixpkgs> {};
  mkDerivation = import ./autotools.nix pkgs;
in mkDerivation {
  name = "graphviz";
  src = ./graphviz-2.49.3.tar.gz;
  buildInputs = with pkgs; [
    pkg-config
    (pkgs.lib.getLib gd)
    (pkgs.lib.getDev gd)
  ];
}

