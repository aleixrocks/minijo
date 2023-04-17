{stdenv}:

stdenv.mkDerivation {
  name = "sleep-on-mutex";
  src = ./src;

  dontUnpack = true;

  buildPhase = ''
    cp -r $src ./src
    chmod +w ./src
    cd ./src
    make
  '';

  installPhase = ''
    mkdir -p $out/bin
    cp ./sleep-on-mutex $out/bin/
  '';
}
