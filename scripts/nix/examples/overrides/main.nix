let
 f = self: {a=self.b; b=self.c; c=self.d; d = 1; };
 override = {d = 2;};
 res = let result = f result; in result;
 ove = let result = f (result//override); in result;
 ovefull = let result = ((f (result // override)) // override); in result;
in {res=res; ove=ove; ovefull=ovefull;}

