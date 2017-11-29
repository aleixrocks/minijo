cmp file1 file2 delta.

Compare the two files byte per byte with a tolerance of delta. file1 and
file2 must containt just raw data without spaces. The size of the element is
hardcored in a typedef type\_t. The tolerance is applied as:

    tol = num_file1*tol;
    if (num_file2 < num_file2 - tol or num_file2 + tol < num_file2) exit;
    
