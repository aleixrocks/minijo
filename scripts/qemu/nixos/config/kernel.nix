{ pkgs, ... }:
{

#  boot.kernelPackages = let
#      linux_fcs_pkg = { fetchurl, buildLinux, ... } @ args:
#
#        buildLinux (args // rec {
#          version = "6.2.8";
#
#          src = /shared/kernel/src;
#          kernelPatches = [];
#
#          #extraConfig = ''
#          #  INTEL_SGX y
#          #'';
#
#        } // (args.argsOverride or {}));
#      linux_fcs = pkgs.callPackage linux_fcs_pkg{};
#    in 
#      pkgs.recurseIntoAttrs (pkgs.linuxPackagesFor linux_fcs);


   boot.kernelPackages = pkgs.linuxPackages_custom {
     version = "6.2.8";
     src = /shared/kernel/src;
     configfile = /shared/kernel/configs/6.2.8_nixos_qemu_localmodconfig;
     allowImportFromDerivation = true;
   };

}
