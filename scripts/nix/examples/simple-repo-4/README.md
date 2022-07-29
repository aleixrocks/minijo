in this repo, we modify default.nix to add an override attribute to
all derivations built with callPackage. We can use this attribute
to create a modified version of the package, but keeping the
original arguments it was created with unless they are overriden
with the new arguments.
