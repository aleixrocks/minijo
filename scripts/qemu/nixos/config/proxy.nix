{ pkgs, ... }:
{

  # setup proxy environemnt variables
  networking.proxy.default = "127.0.0.1:23080";
  networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";

  # setup ssh tunnel between the guest (this system, on qemu) and the host on xeon08
  systemd.services.ssh-tunnel = {
     wantedBy = [ "multi-user.target" ]; 
     after = [ "network-online.target" ];
     description = "SSH Tunnel";
     serviceConfig = {
       User = "sc";
       ExecStart = ''${pkgs.openssh}/bin/ssh -vNL 23080:localhost:23080 arocanon@10.0.2.2'';
     };
  };
  
  environment.systemPackages = [ pkgs.screen ];

}
