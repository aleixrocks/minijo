# Edit this configuration file to define what should be installed on your system.  Help is available in the configuration.nix(5) man page and in the 
# NixOS manual (accessible by running ‘nixos-help’).

{ config, pkgs, ... }:

{ 
  imports = [
     ./hardware-configuration.nix # Include the results of the hardware scan.
     ./kernel.nix
     ./users.nix
     ./proxy.nix
  ];

  # Use the GRUB 2 boot loader.
  # boot.loader.grub.enable = true;
  # boot.loader.grub.version = 2;
  # boot.loader.grub.efiSupport = true; 
  # boot.loader.grub.efiInstallAsRemovable = true;
  # boot.loader.efi.efiSysMountPoint = "/boot/efi"; Define on which hard drive you want to install Grub. 
  # boot.loader.grub.device = "/dev/sda"; # or "nodev" for efi only

  # Use systemd boot
  boot.loader.systemd-boot.enable = true; 

  # Set up serial
  boot.kernelParams = [
    "console=tty1"
    "console=ttyS0,115200"
  ];
  systemd.services."serial-getty@ttyS0" = {
    enable = true;
    wantedBy = [ "getty.target" ]; # to start at boot
    serviceConfig.Restart = "always"; # restart when session is closed
  };

  # mount shared folder with the host
  fileSystems."/shared" = {
    device = "host0";
    fsType = "9p";
    options = [
      "trans=virtio,version=9p2000.L"
    ];
  }; 

  environment.systemPackages = with pkgs; [
    vim
    tmux
  ];
  environment.etc."inputrc".text = pkgs.lib.mkAfter ''
    set show-mode-in-prompt on
    set editing-mode vi
  '';

  # networking.hostName = "nixos";
  # Define your hostname. Pick only one of the below networking options.
  # networking.wireless.enable = true; # Enables wireless support via wpa_supplicant.
  # networking.networkmanager.enable = true; # Easiest to use and most distros use this by default.

  # Set your time zone.
  # time.timeZone = "Europe/Amsterdam";

  # Configure network proxy if necessary
  # networking.proxy.default = "http://user:password@proxy:port/";
  # networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";

  # Select internationalisation properties.
  # i18n.defaultLocale = "en_US.UTF-8"; console = {
  #   font = "Lat2-Terminus16"; keyMap = "us"; useXkbConfig = true; # use xkbOptions in tty.
  # };

  # Enable the X11 windowing system.
  # services.xserver.enable = true;

  # Configure keymap in X11
  # services.xserver.layout = "us"; services.xserver.xkbOptions = {
  #   "eurosign:e"; "caps:escape" # map caps to escape.
  # };

  # Some programs need SUID wrappers, can be configured further or are started in user sessions.
  # programs.mtr.enable = true;
  # programs.gnupg.agent = {
  #   enable = true;
  #   enableSSHSupport = true;
  # };

  # Enable the OpenSSH daemon.
  services.openssh.enable = true;

  # Open ports in the firewall. 
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  # networking.firewall.enable = false;

  # Copy the NixOS configuration file and link it from the resulting system (/run/current-system/configuration.nix). This is useful in case you 
  # accidentally delete configuration.nix.
  system.copySystemConfiguration = true;

  # This value determines the NixOS release from which the default settings for stateful data, like file locations and database versions on your system 
  # were taken. It‘s perfectly fine and recommended to leave this value at the release version of the first install of this system. Before changing this 
  # value read the documentation for this option (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "22.11"; # Did you read the comment?

}

