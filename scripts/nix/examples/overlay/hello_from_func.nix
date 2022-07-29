{stdenv, opt ? 1}:

stdenv.mkDerivation {
  pname = "hello_from_func";
  version = "1.0";
  src = ./hello_from_func.c;

  dontUnpack=true;

  optimize = if opt == 1 then "-O0" else if opt == 3 then "-O3" else if opt == 4 then "-O3 -fno-omit-frame-pointer" else "";

  buildPhase = ''
    gcc $optimize $src -o hello_from_func
  '';

  installPhase = ''
    mkdir -p $out/bin
    cp hello_from_func $out/bin
  '';
}
