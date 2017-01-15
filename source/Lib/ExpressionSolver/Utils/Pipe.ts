const combineReducer = <T>(param: T, func: (param: T) => T) =>
    func(param);

const combine = (param: any, funcs: Array<(param: any) => any>): any =>
    funcs.reduce(combineReducer, param);

/**
 * Takes variable number of functions which take one parameter. Returns a function,
 * which is their sequenced combination. The returned function takes one parameter.
 */
const untypedPipe = (...funcs: Array<(param: any) => any>) =>
    (param: any) => combine(param, funcs);

/**
 * We're creating 20 diferent Typescript overloads in order to support proper typechecking.
 * Unfortunately Typescript doesn't have any other reasonable way to do it now,
 * we got to type it manually. Typechecking is limited for first 19 overloads,
 * there is not much chance you would need more.
 */
class PipeClass {

    // 2 - 5

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T3) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5, R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => R
        ): (param: T1) => R;

    // 6 - 10

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => R
        ): (param: T1) => R;
    
    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => R
        ): (param: T1) => R;

    // 11 - 15

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12, T13,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => T13,
        f13: (param: T13) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12, T13, T14,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => T13,
        f13: (param: T13) => T14,
        f14: (param: T14) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12, T13, T14, T15,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => T13,
        f13: (param: T13) => T14,
        f14: (param: T14) => T15,
        f15: (param: T15) => R
        ): (param: T1) => R;

    // 15 - 20

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12, T13, T14, T15,
        T16,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => T13,
        f13: (param: T13) => T14,
        f14: (param: T14) => T15,
        f15: (param: T15) => T16,
        f16: (param: T16) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12, T13, T14, T15,
        T16, T17,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => T13,
        f13: (param: T13) => T14,
        f14: (param: T14) => T15,
        f15: (param: T15) => T16,
        f16: (param: T16) => T17,
        f17: (param: T17) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12, T13, T14, T15,
        T16, T17, T18,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => T13,
        f13: (param: T13) => T14,
        f14: (param: T14) => T15,
        f15: (param: T15) => T16,
        f16: (param: T16) => T17,
        f17: (param: T17) => T18,
        f18: (param: T18) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12, T13, T14, T15,
        T16, T17, T18, T19,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => T13,
        f13: (param: T13) => T14,
        f14: (param: T14) => T15,
        f15: (param: T15) => T16,
        f16: (param: T16) => T17,
        f17: (param: T17) => T18,
        f18: (param: T18) => T19,
        f19: (param: T19) => R
        ): (param: T1) => R;

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, T4, T5,
        T6, T7, T8, T9, T10,
        T11, T12, T13, T14, T15,
        T16, T17, T18, T19, T20,
        R>
        (
        f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        f3: (param: T3) => T4,
        f4: (param: T4) => T5,
        f5: (param: T5) => T6,
        f6: (param: T6) => T7,
        f7: (param: T7) => T8,
        f8: (param: T8) => T9,
        f9: (param: T9) => T10,
        f10: (param: T10) => T11,
        f11: (param: T11) => T12,
        f12: (param: T12) => T13,
        f13: (param: T13) => T14,
        f14: (param: T14) => T15,
        f15: (param: T15) => T16,
        f16: (param: T16) => T17,
        f17: (param: T17) => T18,
        f18: (param: T18) => T19,
        f19: (param: T19) => T20,
        f20: (param: T20) => R
        ): (param: T1) => R;

    // Variable

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, R>
        (f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        ...fnArray: ((param: any) => any)[]): (param: T1) => R;

    // The actual method

    /**
     * Takes variable number of functions which take one parameter. Returns a function,
     * which is their sequenced combination. The returned function takes one parameter.
     */
    static typedPipe<T1, T2, T3, R>
        (f1: (param: T1) => T2,
        f2: (param: T2) => T3,
        ...fnArray: ((param: any) => any)[]): (param: T1) => R {
        switch (true) {
            case (fnArray.length >= 1):
                return untypedPipe(
                    f1,
                    f2,
                    ...fnArray
                );
            default:
                return untypedPipe(
                    f1,
                    f2
                );
        }
    }
}

/**
 * Takes variable number of functions which take one parameter. Returns a function,
 * which is their sequenced combination. The returned function takes one parameter.
 */
export const pipe = PipeClass.typedPipe;