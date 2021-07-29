#ifndef _FUN_PROBE_H_
#define _FUN_PROBE_H_

#define __FUN_ARGS_LOWER_0(...)
#define __FUN_ARGS_LOWER_2(a, ...)                          (a)
#define __FUN_ARGS_LOWER_4(a, b, ...)                       (a, b)
#define __FUN_ARGS_LOWER_6(a, b, c, ...)                    (a, b, c)
#define __FUN_ARGS_LOWER_8(a, b, c, d, ...)                 (a, b, c, d)
#define __FUN_ARGS_LOWER_10(a, b, c, d, e, ...)             (a, b, c, d, e)
#define __FUN_ARGS_LOWER_12(a, b, c, d, e, f, ...)          (a, b, c, d, e, f)
#define __FUN_ARGS_LOWER_14(a, b, c, d, e, f, g, ...)       (a, b, c, d, e, f, g)
#define __FUN_ARGS_LOWER_16(a, b, c, d, e, f, g, h, ...)    (a, b, c, d, e, f, g, h)
#define __FUN_ARGS_LOWER_18(a, b, c, d, e, f, g, h, i, ...) (a, b, c, d, e, f, g, h, i)

#define __FUN_ARGS_UPPER_0()
#define __FUN_ARGS_UPPER_2(_1, a)                                                          (a)
#define __FUN_ARGS_UPPER_4(_1, _2, a, b)                                                   (a, b)
#define __FUN_ARGS_UPPER_6(_1, _2, _3, a, b, c)                                            (a, b, c)
#define __FUN_ARGS_UPPER_8(_1, _2, _3, _4, a, b, c, d)                                     (a, b, c, d)
#define __FUN_ARGS_UPPER_10(_1, _2, _3, _4, _5, a, b, c, d, e)                             (a, b, c, d, e)
#define __FUN_ARGS_UPPER_12(_1, _2, _3, _4, _5, _6, a, b, c, d, e, f)                      (a, b, c, d, e, f)
#define __FUN_ARGS_UPPER_14(_1, _2, _3, _4, _5, _6, _7, a, b, c, d, e, f, g)               (a, b, c, d, e, f, g)
#define __FUN_ARGS_UPPER_16(_1, _2, _3, _4, _5, _6, _7, _8, a, b, c, d, e, f, g, h)        (a, b, c, d, e, f, g, h)
#define __FUN_ARGS_UPPER_18(_1, _2, _3, _4, _5, _6, _7, _8, _9, a, b, c, d, e, f, g, h, i) (a, b, c, d, e, f, g, h, i)

#define __FUN_NARGS(_0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, ...) (_18)

#define __FUN_ARGS_LOW(n, ...)      __FUN_ARGS_LOWER_ ## n (__VA_ARGS__)
#define __FUN_ARGS_LOW_PRESCAN(...) __FUN_ARGS_LOW (__VA_ARGS__)
#define __FUN_ARGS_UP(n, ...)          __FUN_ARGS_UPPER_ ## n (__VA_ARGS__)
#define __FUN_ARGS_UP_PRESCAN(n, ...)  __FUN_ARGS_UP(__VA_ARGS__)

// return number of arguments
#define FUN_NARGS(...) __FUN_NARGS(__VA_ARGS__, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0)
// return lower (right) half of arguments
#define FUN_ARGS_LOW(...)           __FUN_ARGS_LOW_PRESCAN(FUN_NARGS(__VA_ARGS__), __VA_ARGS__)
// return upper (left) half of arguments
#define FUN_ARGS_UP(...)               __FUN_ARGS_UP_PRESCAN(FUN_NARGS(__VA_ARGS__), __VA_ARGS__)


#endif // _FUN_PROBE_H_
