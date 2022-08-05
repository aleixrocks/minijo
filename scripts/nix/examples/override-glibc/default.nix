let
  nixpkgs = import <nixpkgs> {overlays=[overlay1];};

  overlay1 = self: super: # self is the new, super is the old
  {
    #stdenv = super.withCFlags [ "-fno-omit-frame-pointer" ] super.stdenv;                                                       

    #glibc = super.glibc.overrideAttrs (oldAttrs: rec {
    #   version = "2.27";
    #   name = "glibc-${version}";
    #   src = builtins.fetchurl {
    #       url    = "https://ftp.gnu.org/gnu/glibc/glibc-${version}.tar.xz";
    #       sha256 = "0wpwq7gsm7sd6ysidv0z575ckqdg13cr2njyfgrbgh4f65adwwji";
    #   };
    #});

    #glibc = super.glibc.override { extraBuildInputs = [ super.libsystemtap ]; };
    #glibc = super.glibc.overrideAttrs (oldAttrs: {
    #  #configureFlags = oldAttrs.configureFlags ++ [ "--enable-systemtap" ];
    #  #buildInputs = oldAttrs.buildInputs ++ [ super.libsystemtap ];
    #  buildInputs = [ super.libsystemtap ];
    #});

    mylibsystemtap = super.libsystemtap.overrideAttrs(oldAttrs: {
      src = ./mylibsystemtap/systemtap;
      patches = [ ./mylibsystemtap/config.patch ];
      nativeBuildInputs = [ super.autoreconfHook ];
      configureFlags = [ "--without-python2-probes" "--without-python3-probes" "--disable-translator" ];
    });

    #mylibsystemtap = super.libsystemtap.override({
    #  lib = super.lib;
    #  stdenv = super.stdenv;
    #  fetchgit = super.fetchgit;
    #  gettext = super.gettext;
    #  python3 = super.python3;
    #  elfutils = super.elfutils;
    #});

    glibc = super.glibc.override {stdenv = super.gcc12Stdenv; };

    #glibc = (super.glibc.override {stdenv = super.gcc12Stdenv; }).overrideAttrs (oldAttrs: {
    #  configureFlags = oldAttrs.configureFlags ++ [ "--enable-systemtap" ];
    #  buildInputs = oldAttrs.buildInputs ++ [ self.mylibsystemtap ];
    #});

    #glibc = super.glibc.overrideAttrs (oldAttrs: {
    #  configureFlags = oldAttrs.configureFlags ++ [ "--enable-systemtap" ];
    #  buildInputs = oldAttrs.buildInputs ++ [ self.mylibsystemtap ];
    #});


    #oldhello = super.hello;

    #hello = super.hello.overrideAttrs (oldAttrs: {
    #  buildInputs = [ super.libsystemtap ];
    #});

    
  };

in nixpkgs

