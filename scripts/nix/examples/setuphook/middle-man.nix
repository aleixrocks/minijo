{stdenv}:
stdenv.mkDerivation {
  name = "middle-man";
  src = ./middle-man.sh;

  setupHook = ./setup-hook.sh;

  dontUnpack=true;
  dontPatch=true;
  dontConfigure=true;
  dontBuild=true;
  #dontFixup=true; #this loads setupHook!

  installPhase = ''
    mkdir -p $out/bin
    cp $src $out/bin
  '';
}
