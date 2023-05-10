{ pkgs, ... }:
{

  users.mutableUsers = false;
  users.users.sc = {
    uid = 1000; # same uid as host to avoid issues with shared folder permissions
    isNormalUser = true;
    home = "/home/sc";
    description = "Sched Coop";
    extraGroups = [ "wheel" ];
    openssh.authorizedKeys.keys = [ 
      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDyyUYoprCIlngjht+IxcUDDUPXs+bt4r4bYpXg1ofzFPCEayf503h4oD/DvSBCV0sJAjSF702SMJHyBtKvncKitw7GSULjH7NwsL4M4vDzXKdmFmHsjiJeOMQaLpwoxqK9S7YAC0GQjkkRNJp4ulxTfYbT4d2QDXwfNtBe9ACF403n+6mnPMA0SAaieiBfcuKQZ3dfhSyAiaFWMTwnRRi0e5ppBx3OuCWg1Ir+Gtc/wZHw3rvgtqjuCtm0VIBpjUfGjJXS+Jgfc5u90uhAl/HPx4VMT2FtEXfdBOxw7ZWdQpKLkcV7wM0U6Cba42ghi2xbKTH6mv14GtRPb54BMldl aleix@rocks" 
      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtCMRCdQ6FBPS+plkPIF48BguCwHG9G/C3kG1xzSlzDXgz8iDZO3iL23BxKTfdsqwDymRr0UB+XX7HJL2z1Fl+BykLAd+EFpIC7qDU+TEOkgpszH2idk3xq/39uQeqYFRVBFAhuLwsUZmjDvSFqkac2LWHxh+8vJNLyq5Y9sC8yJK+ysoZoKKwv6TFoBgiaHcMVm5zKON7ERFx/XM3gerRC/FnUg652agRYaYabk/Y49+htdDiGzzMrjxq4DAJDw+5Yb/wv5Z4bp0UcxF/R/3H8uyJX0TsIUr79RaBKB3E51MZbZgpJQvyaXX3U1/1DJvXVESjXw7OVrrye3C9w6yt arocanon@ssfhead"
    ];
    hashedPassword = "$y$j9T$vuYQ.TvY6GTbt1lV.1mr70$wkvAuoZcs39VESztilzVLcU.97f3Py1lZad1c9rsrL.";
  };

}
