{stdenv}:

stdenv.mkDerivation {
  name = "libsystemtap-headers";
  src = ./includes;

  dontBuild = true;

  installPhase = ''
    mkdir -p $out/include
    cp -r $src/* $out/include
  '';
}
