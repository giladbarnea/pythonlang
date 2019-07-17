import {int, Int} from "../int";
import {bool} from "../bool";
import {ValueError, ZeroDivisionError} from "../exceptions"
import {Chance} from 'chance';

const chance = new Chance();
/**\Lib\test\test_int.py*/
describe('CPython Tests', () => {
    const L = [
        ['0', 0],
        ['1', 1],
        ['9', 9],
        ['10', 10],
        ['99', 99],
        ['100', 100],
        ['314', 314],
        [' 314', 314],
        ['314 ', 314],
        [false, 0],
        ['  \t\t  314  \t\t  ', 314],
        // [repr(sys.maxsize), sys.maxsize],
        ['  1  ', 1],
    ];
    describe('test_basic', () => {
        expect(int()).toEqual(0);
        expect(int(false)).toEqual(0);
        expect(int(314)).toEqual(314);
        expect(int(3.14)).toEqual(3);
        // Check that conversion from float truncates towards zero
        expect(int(-3.14)).toEqual(-3);
        expect(int(3.9)).toEqual(3);
        expect(int(-3.9)).toEqual(-3);
        expect(int(3.5)).toEqual(3);
        expect(int(-3.5)).toEqual(-3);
        test('-3', () => expect(int("-3")).toEqual(-3));
        test(' -3 ', () => expect(int(" -3 ")).toEqual(-3));
        test('10, 16', () => expect(int("10", 16)).toEqual(16));
        
        for (let [s, v] of L) {
            for (let sign of ["", "+", "-"]) {
                for (let prefix of ["", " ", "\t", "  \t\t  "]) {
                    let ss = prefix + sign + s;
                    let vv = v;
                    if (sign == "-") {
                        vv = -v
                    }
                    try {
                        let actual = int(ss);
                        expect(actual).toEqual(vv);
                    } catch (e) {
                        let isValueError = e instanceof ValueError;
                        if (!(isValueError)) {
                            console.log('failed toEqual.\nexpected:', vv, {prefix, sign, s, v, ss, e});
                            throw e
                        } else {
                        
                        }
                        
                    }
                }
            }
        }
        
        
        /*s = repr(-1-sys.maxsize)
        x = int(s)
        self.assertEqual(x+1, -sys.maxsize)
        self.assertIsInstance(x, int)
        # should return int
        self.assertEqual(int(s[1:]), sys.maxsize+1)
        */
        
        // should return int
        expect(int(1e100)).toBeInstanceOf(Int);
        expect(int(-1e100)).toBeInstanceOf(Int);
        
        
        /*x = -1-sys.maxsize
        */
        let x = int('1' * 600);
        expect(x >> 1).toEqual(x / 2);
        
        expect(x).toBeInstanceOf(Int);
        expect(() => int(1, 12)).toThrow(TypeError);
        
        expect(int('0x123', 16)).toEqual(291);
        expect(int('0x123', 0)).toEqual(291); // mine
        // expect(int('0x123', 16) === int('0x123', 0)).toBe(true); // mine
        // expect(int('0x123', 16)).toBe(int('0x123', 0)); // mine
        expect(int('0o123', 0)).toEqual(83);
        expect(int('0o123', 0)).toEqual(int('0o123', 8)); // mine
        
        const shouldThrow = [
            () => int('0x', 16),
            () => int('0x', 0),
            () => int('0o', 8),
            () => int('0o', 0),
            () => int('0b', 2),
            () => int('0b', 0),
        
        ];
        for (let bad of shouldThrow)
            expect(bad).toThrow(ValueError);
        // Lib\test\test_int.py
        describe('2**32 (4294967296)', () => {
            
            test("int('100000000000000000000000000000000', 2)", () => expect(int('100000000000000000000000000000000', 2)).toEqual(4294967296));
            test("int('102002022201221111211', 3)", () => expect(int('102002022201221111211', 3)).toEqual(4294967296));
            test("int('10000000000000000', 4)", () => expect(int('10000000000000000', 4)).toEqual(4294967296));
            test("int('32244002423141', 5)", () => expect(int('32244002423141', 5)).toEqual(4294967296));
            test("int('1550104015504', 6)", () => expect(int('1550104015504', 6)).toEqual(4294967296));
            test("int('211301422354', 7)", () => expect(int('211301422354', 7)).toEqual(4294967296));
            test("int('12068657454', 9)", () => expect(int('12068657454', 9)).toEqual(4294967296));
            test("int('4294967296', 10)", () => expect(int('4294967296', 10)).toEqual(4294967296));
            test("int('1904440554', 11)", () => expect(int('1904440554', 11)).toEqual(4294967296));
            // letter: 'b',
            // isBinary: false,
            // isOctal: false,
            // isHexaDecimal: false,
            // isSpecial: false,
            // specialBase: undefined,
            // mod: NaN,
            // isFloat: false,
            // 'nosign[0]: ': '9',
            // 'RegExp(/[a-zA-Z]/).test(letter)': true,
            // 'parseInt(x, base)': 4294967296
            test("int('9ba461594', 12)", () => expect(int('9ba461594', 12)).toEqual(4294967296));
            test("int('535a79889', 13)", () => expect(int('535a79889', 13)).toEqual(4294967296));
            test("int('2ca5b7464', 14)", () => expect(int('2ca5b7464', 14)).toEqual(4294967296));
            test("int('1a20dcd81', 15)", () => expect(int('1a20dcd81', 15)).toEqual(4294967296));
            test("int('100000000', 16)", () => expect(int('100000000', 16)).toEqual(4294967296));
            test("int('a7ffda91', 17)", () => expect(int('a7ffda91', 17)).toEqual(4294967296));
            test("int('704he7g4', 18)", () => expect(int('704he7g4', 18)).toEqual(4294967296));
            test("int('4f5aff66', 19)", () => expect(int('4f5aff66', 19)).toEqual(4294967296));
            test("int('3723ai4g', 20)", () => expect(int('3723ai4g', 20)).toEqual(4294967296));
            test("int('281d55i4', 21)", () => expect(int('281d55i4', 21)).toEqual(4294967296));
            test("int('1fj8b184', 22)", () => expect(int('1fj8b184', 22)).toEqual(4294967296));
            test("int('1606k7ic', 23)", () => expect(int('1606k7ic', 23)).toEqual(4294967296));
            test("int('mb994ag', 24)", () => expect(int('mb994ag', 24)).toEqual(4294967296));
            test("int('hek2mgl', 25)", () => expect(int('hek2mgl', 25)).toEqual(4294967296));
            test("int('dnchbnm', 26)", () => expect(int('dnchbnm', 26)).toEqual(4294967296));
            test("int('b28jpdm', 27)", () => expect(int('b28jpdm', 27)).toEqual(4294967296));
            test("int('8pfgih4', 28)", () => expect(int('8pfgih4', 28)).toEqual(4294967296));
            test("int('76beigg', 29)", () => expect(int('76beigg', 29)).toEqual(4294967296));
            test("int('5qmcpqg', 30)", () => expect(int('5qmcpqg', 30)).toEqual(4294967296));
            test("int('4q0jto4', 31)", () => expect(int('4q0jto4', 31)).toEqual(4294967296));
            test("int('4000000', 32)", () => expect(int('4000000', 32)).toEqual(4294967296));
            test("int('3aokq94', 33)", () => expect(int('3aokq94', 33)).toEqual(4294967296));
            test("int('2qhxjli', 34)", () => expect(int('2qhxjli', 34)).toEqual(4294967296));
            test("int('2br45qb', 35)", () => expect(int('2br45qb', 35)).toEqual(4294967296));
            test("int('1z141z4', 36)", () => expect(int('1z141z4', 36)).toEqual(4294967296));
        });
        
        describe('base 0', () => {
            test("int(' 0o123  ', 0)", () => expect(int(' 0o123  ', 0)).toEqual(83));
            test("int('000', 0)", () => expect(int('000', 0)).toEqual(0));
            test("int('0o123', 0)", () => expect(int('0o123', 0)).toEqual(83));
            test("int('0x123', 0)", () => expect(int('0x123', 0)).toEqual(291));
            test("int('0b100', 0)", () => expect(int('0b100', 0)).toEqual(4));
            test("int(' 0O123   ', 0)", () => expect(int(' 0O123   ', 0)).toEqual(83));
            test("int(' 0X123  ', 0)", () => expect(int(' 0X123  ', 0)).toEqual(291));
            test("int(' 0B100 ', 0)", () => expect(int(' 0B100 ', 0)).toEqual(4));
        });
        test('without base still base 10', () => {
            expect(int('0123')).toEqual(123);
            expect(int('0123', 10)).toEqual(123);
        });
        describe('with prefix and base != 0', () => {
            
            test("int('0x123', 16)", () => expect(int('0x123', 16)).toEqual(291));
            test("int('0o123', 8)", () => expect(int('0o123', 8)).toEqual(83));
            test("int('0b100', 2)", () => expect(int('0b100', 2)).toEqual(4));
            test("int('0X123', 16)", () => expect(int('0X123', 16)).toEqual(291));
            test("int('0O123', 8)", () => expect(int('0O123', 8)).toEqual(83));
            test("int('0B100', 2)", () => expect(int('0B100', 2)).toEqual(4))
        });
        
        
        describe('special checks for the first character after the type prefix', () => {
            expect(() => int('0b2', 2)).toThrow(ValueError);
            expect(() => int('0b02', 2)).toThrow(ValueError);
            expect(() => int('0B2', 2)).toThrow(ValueError);
            expect(() => int('0B02', 2)).toThrow(ValueError);
            expect(() => int('0o8', 8)).toThrow(ValueError);
            expect(() => int('0o08', 8)).toThrow(ValueError);
            expect(() => int('0O8', 8)).toThrow(ValueError);
            expect(() => int('0O08', 8)).toThrow(ValueError);
            expect(() => int('0xg', 16)).toThrow(ValueError);
            expect(() => int('0x0g', 16)).toThrow(ValueError);
            expect(() => int('0Xg', 16)).toThrow(ValueError);
            expect(() => int('0X0g', 16)).toThrow(ValueError);
        });
        
        describe('2**32 + 1 (4294967297)', () => {
            
            
            test("int('100000000000000000000000000000001', 2)", () => expect(int('100000000000000000000000000000001', 2)).toEqual(4294967297));
            test("int('102002022201221111212', 3)", () => expect(int('102002022201221111212', 3)).toEqual(4294967297));
            test("int('10000000000000001', 4)", () => expect(int('10000000000000001', 4)).toEqual(4294967297));
            test("int('32244002423142', 5)", () => expect(int('32244002423142', 5)).toEqual(4294967297));
            test("int('1550104015505', 6)", () => expect(int('1550104015505', 6)).toEqual(4294967297));
            test("int('211301422355', 7)", () => expect(int('211301422355', 7)).toEqual(4294967297));
            test("int('40000000001', 8)", () => expect(int('40000000001', 8)).toEqual(4294967297));
            test("int('12068657455', 9)", () => expect(int('12068657455', 9)).toEqual(4294967297));
            test("int('4294967297', 10)", () => expect(int('4294967297', 10)).toEqual(4294967297));
            test("int('1904440555', 11)", () => expect(int('1904440555', 11)).toEqual(4294967297));
            // letter: 'b',
            // isBinary: false,
            // isOctal: false,
            // isHexaDecimal: false,
            // isSpecial: false,
            // specialBase: undefined,
            // mod: NaN,
            // isFloat: false,
            // 'nosign[0]: ': '9',
            // 'RegExp(/[a-zA-Z]/).test(letter)': true,
            // 'parseInt(x, base)': 4294967297
            test("int('9ba461595', 12)", () => expect(int('9ba461595', 12)).toEqual(4294967297));
            test("int('535a7988a', 13)", () => expect(int('535a7988a', 13)).toEqual(4294967297));
            test("int('2ca5b7465', 14)", () => expect(int('2ca5b7465', 14)).toEqual(4294967297));
            test("int('1a20dcd82', 15)", () => expect(int('1a20dcd82', 15)).toEqual(4294967297));
            test("int('100000001', 16)", () => expect(int('100000001', 16)).toEqual(4294967297));
            test("int('a7ffda92', 17)", () => expect(int('a7ffda92', 17)).toEqual(4294967297));
            test("int('704he7g5', 18)", () => expect(int('704he7g5', 18)).toEqual(4294967297));
            test("int('4f5aff67', 19)", () => expect(int('4f5aff67', 19)).toEqual(4294967297));
            test("int('3723ai4h', 20)", () => expect(int('3723ai4h', 20)).toEqual(4294967297));
            test("int('281d55i5', 21)", () => expect(int('281d55i5', 21)).toEqual(4294967297));
            test("int('1fj8b185', 22)", () => expect(int('1fj8b185', 22)).toEqual(4294967297));
            test("int('1606k7id', 23)", () => expect(int('1606k7id', 23)).toEqual(4294967297));
            test("int('mb994ah', 24)", () => expect(int('mb994ah', 24)).toEqual(4294967297));
            test("int('hek2mgm', 25)", () => expect(int('hek2mgm', 25)).toEqual(4294967297));
            test("int('dnchbnn', 26)", () => expect(int('dnchbnn', 26)).toEqual(4294967297));
            test("int('b28jpdn', 27)", () => expect(int('b28jpdn', 27)).toEqual(4294967297));
            test("int('8pfgih5', 28)", () => expect(int('8pfgih5', 28)).toEqual(4294967297));
            test("int('76beigh', 29)", () => expect(int('76beigh', 29)).toEqual(4294967297));
            test("int('5qmcpqh', 30)", () => expect(int('5qmcpqh', 30)).toEqual(4294967297));
            test("int('4q0jto5', 31)", () => expect(int('4q0jto5', 31)).toEqual(4294967297));
            test("int('4000001', 32)", () => expect(int('4000001', 32)).toEqual(4294967297));
            test("int('3aokq95', 33)", () => expect(int('3aokq95', 33)).toEqual(4294967297));
            test("int('2qhxjlj', 34)", () => expect(int('2qhxjlj', 34)).toEqual(4294967297));
            test("int('2br45qc', 35)", () => expect(int('2br45qc', 35)).toEqual(4294967297));
            test("int('1z141z5', 36)", () => expect(int('1z141z5', 36)).toEqual(4294967297))
            
        });
    });
    describe('longobject.c', () => {
        // Objects\longobject.c.PyLong_FromString (2117)
        test('PyLong_FromString', () => {
            expect(int('10')).toEqual(10);
            expect(int('+10')).toEqual(10);
            expect(int('-10')).toEqual(-10);
        })
    })
});
describe('PyPy Tests', () => {
    test('inplace', () => {
        let eight = int(8);
        eight--;
        expect(eight).toEqual(7);
        let seven = int(7);
        seven++;
        expect(seven).toEqual(8);
    });
});
describe('Int vs pure JS', () => {
    test('operands', () => {
        
        let n1 = chance.integer();
        let n2 = chance.integer();
        let n0 = 0;
        let posn = chance.integer({min: 1});
        let negn = -posn;
        let int1 = int(n1);
        let int2 = int(n2);
        let int0 = int(0);
        let posint = int(posn);
        let negint = int(negn);
        expect(() => int1.divide(n0)).toThrow(ZeroDivisionError);
        expect(() => int1.divide("0")).toThrow(ZeroDivisionError);
        expect(() => int1.divide(int0)).toThrow(ZeroDivisionError);
        
        expect(-int1).toEqual(-n1);
        expect(-1 * int1).toEqual(-int1);
        
        expect(+int1).toEqual(+n1);
        expect(+int1).toEqual(n1);
        expect(1 * int1).toEqual(+int1);
        
        expect(int1 + int2).toEqual(n1 + n2);
        expect(int1 - int2).toEqual(n1 - n2);
        expect(int1 * int2).toEqual(n1 * n2);
        expect(int1 / int2).toEqual(n1 / n2);
        
        expect(int1 % int2).toEqual(n1 % n2);
        
        expect(int1 ** int2).toEqual(n1 ** n2);
        expect(int1 ** -int2).toEqual(n1 ** -n2);
        expect((-int1) ** int2).toEqual((-n1) ** n2);
        expect((-int1) ** -int2).toEqual((-n1) ** -n2);
        
        expect(Math.atan2(int1, int2)).toEqual(Math.atan2(n1, n2));
        expect(Math.abs(int1)).toEqual(Math.abs(n1));
        expect(Math.abs(-int1)).toEqual(Math.abs(n1));
        expect(Math.abs(negint)).toEqual(posint);
        expect(Math.abs(negn)).toEqual(posint);
        
        
        //    TODO: divmod
    });
    test('Boolean', () => {
        let pos = chance.integer({min: 1});
        let neg = chance.integer({max: 0});
        
        let intpos = int(pos);
        let intneg = int(neg);
        
        
        expect(Boolean(intpos)).toBe(true);
        
        
        expect(!Boolean(intpos)).toBe(false);
        expect(!intpos).toBe(false);
        
        expect(Boolean(intneg)).toBe(true);
        expect(!!intneg).toBe(true);
        expect(!Boolean(intneg)).toBe(false);
        expect(!intneg).toBe(false);
        
        // TODO: these fail
        /*
        let int0 = int(0);
        expect(Boolean(int0)).toBe(false);
        expect(!int0).toBe(true);
        expect(!!int0).toBe(false);
        
        expect(!!intpos).toBe(true);
        */
    });
    
});
describe.skip('Int vs pythonlang', () => {
    test('TypeError', () => {
        expect(() => int(list()))
            .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not 'list'`));
        expect(() => int(dict()))
            .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not 'dict'`));
    });
    test('bool', () => {
        let pos = chance.integer({min: 1});
        let neg = chance.integer({max: 0});
        let int0 = int(0);
        let intpos = int(pos);
        let intneg = int(neg);
        let boolintpos = bool(intpos);
        let boolintneg = bool(intneg);
        let boolint0 = bool(int0);
        
        expect(boolint0).toBe(false);
        expect(!boolint0).toBe(true);
        
        
        expect(boolintpos).toBe(true);
        expect(!boolintpos).toBe(false);
        
        
        expect(boolintneg).toBe(false);
        expect(!boolintneg).toBe(true);
        
        
    });
});
describe('Bitwise', () => {
    test('bitwise operators', () => {
        // https://wiki.python.org/moin/BitwiseOperators
        
    });
    describe('numbers with letters must have some base', () => {
        test("int('0711')", () => expect(int('0711')).toEqual(711));
        test("int('0b11')", () => expect(() => int('0b11')).toThrow(new ValueError(`invalid literal for int() with base 10: '0b11'`)));
        test("int('0o11')", () => expect(() => int('0o11')).toThrow(new ValueError(`invalid literal for int() with base 10: '0o11'`)));
        test("int('0x11')", () => expect(() => int('0x11')).toThrow(new ValueError(`invalid literal for int() with base 10: '0x11'`)));
        test("int('0c11')", () => expect(() => int('0c11')).toThrow(new ValueError(`invalid literal for int() with base 10: '0c11'`)));
        test("int('11')", () => expect(int('11')).toEqual(11));
    });
    describe('base 0 works only if bin/hex/oct, otherwise only if x["0"] != 0', () => {
        test("int('0711',0)", () => expect(() => int('0711', 0)).toThrow(new ValueError(`invalid literal for int() with base 0: '0711'`)));
        test("int('711',0)", () => expect(int('711', 0)).toEqual(711));
        test("int('0b11',0)", () => expect(int('0b11', 0)).toEqual(3));
        test("int('0o11',0)", () => expect(int('0o11', 0)).toEqual(9));
        test("int('0x11',0)", () => expect(int('0x11', 0)).toEqual(17));
        test("int('0c11',0)", () => expect(() => int('0c11', 0)).toThrow(new ValueError(`invalid literal for int() with base 0: '0c11'`)));
        test("int('11',0)", () => expect(int('11', 0)).toEqual(11));
    });
    describe('base 2 works only if all digits < 2, or with true binary (digits == 11)', () => {
        test("int('0711', 2)", () => expect(() => int('0711', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0711'`)));
        test("int('0b11', 2)", () => expect(int('0b11', 2)).toEqual(3));
        test("int('0o11', 2)", () => expect(() => int('0o11', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0o11'`)));
        test("int('0x11', 2)", () => expect(() => int('0x11', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0x11'`)));
        test("int('0c11', 2)", () => expect(() => int('0c11', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0c11'`)));
        test("int('11', 2)", () => expect(int('11', 2)).toEqual(3));
    });
    describe('base 2 works only if all digits < 2, or with true binary (digits == 12)', () => {
        test("int('0712', 2)", () => expect(() => int('0712', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0712'`)));
        test("int('0b12', 2)", () => expect(() => int('0b12', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0b12'`)));
        test("int('0o12', 2)", () => expect(() => int('0o12', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0o12'`)));
        test("int('0x12', 2)", () => expect(() => int('0x12', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0x12'`)));
        test("int('0c12', 2)", () => expect(() => int('0c12', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0c12'`)));
        test("int('12', 2)", () => expect(() => int('12', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '12'`)));
    });
    describe('bin: base 0, 2 or > 11; oct: base 0, 8 or > 24; bin: base 0, 2 or > 11; hex: base 0, 16 or > 33; ', () => {
        test("int('0711', 8)", () => expect(int('711', 8)).toEqual(457));
        test("int('0b11', 11)", () => expect(() => int('0b11', 11)).toThrow(new ValueError(`invalid literal for int() with base 11: '0b11'`)));
        test("int('0b11', 12)", () => expect(int('0b11', 12)).toEqual(1597);
        test("int('0o11', 8)", () => expect(int('0o11', 8)).toEqual(9));
        test("int('0o11', 24)", () => expect(() => int('0o11', 24)).toThrow(new ValueError(`invalid literal for int() with base 24: '0o11'`)));
        test("int('0o11', 25)", () => expect(int('0o11', 25)).toEqual(15026));
        test("int('0x11', 16)", () => expect(int('0x11', 16)).toEqual(17));
        test("int('0x11', 33)", () => expect(() => int('0x11', 33)).toThrow(new ValueError(`invalid literal for int() with base 33: '0x11'`)));
        test("int('0x11', 34)", () => expect(int('0x11', 34)).toEqual(38183));
        //letter: 'c',
        // isBinary: false,
        // isOctal: false,
        // isHexaDecimal: false,
        // isSpecial: false,
        // specialBase: undefined,
        // mod: NaN,
        // isFloat: false,
        // 'nosign[0]: ': '0',
        // 'RegExp(/[a-zA-Z]/).test(letter)': true,
        // 'parseInt(x, base)': 2042
        test("int('0c11', 13)", () => expect(int('0c11', 13)).toEqual(2042));
        test("int('0d11', 14)", () => expect(int('0d11', 14)).toEqual(2563));
        let base = chance.integer({min: 2, max: 36});
        test(`int('11', ${base})`, () => expect(int('11', base)).toEqual(parseInt('11', base)));
    });
    
    
    describe('binary numbers', () => {
        // TODO: int('1b111101',2) etc. should fail
        
        test('number, no base', () => expect(int(0b11)).toEqual(3));
        test('number, base 0', () => expect(() => int(0b11, 0)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        test('number, base 1', () => expect(() => int(0b11, 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0")));
        
        for (let i = 2; i <= 36; i++)
            test(`number, base ${i}`, () => expect(() => int(0b11, i)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        
        //int('07111101', 0) throws, int('0b11', 0) doesn't. int('0c111101', 0) throws, int('7111101', 0) doesn't.
        test('string literal, base 0', () => expect(int('0b11', 0)).toEqual(3));
        test('string literal, base 1', () => expect(() => int('0b11', 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0")));
        test('string literal, base 1 with spaces', () => expect(() => int('  0b11', 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0")));
        test('string literal with 0b, base 2', () => expect(int('0b11', 2)).toEqual(3));
        test('string literal with 0b, base 2 with spaces', () => expect(int('  0b11', 2)).toEqual(3));
        test('string literal without 0b, base 2', () => expect(int('11', 2)).toEqual(3));
        test('string literal without 0b, base 2 with spaces', () => expect(int('  11', 2)).toEqual(3));
        for (let i = 3; i <= 11; i++)
            test(`string literal, base: ${i}`, () => expect(() => int('0b11', i)).toThrow(new ValueError(`invalid literal for int() with base ${i}: '0b11'`)));
        test('string literal, base 12', () => expect(int('0b11', 12)).toEqual(1597));
        test('string literal, base 13', () => expect(int('0b11', 13)).toEqual(1873));
        test('string literal, base 14', () => expect(int('0b11', 14)).toEqual(2171));
        test('string literal, base 15', () => expect(int('0b11', 15)).toEqual(2491));
        test('string literal, base 16', () => expect(int('0b11', 16)).toEqual(2833));
        test('string literal, base 17', () => expect(int('0b11', 17)).toEqual(3197));
        test('string literal, base 18', () => expect(int('0b11', 18)).toEqual(3583));
        test('string literal, base 19', () => expect(int('0b11', 19)).toEqual(3991));
        test('string literal, base 20', () => expect(int('0b11', 20)).toEqual(4421));
        test('string literal, base 21', () => expect(int('0b11', 21)).toEqual(4873));
        test('string literal, base 22', () => expect(int('0b11', 22)).toEqual(5347));
        test('string literal, base 23', () => expect(int('0b11', 23)).toEqual(5843));
        test('string literal, base 24', () => expect(int('0b11', 24)).toEqual(6361));
        test('string literal, base 25', () => expect(int('0b11', 25)).toEqual(6901));
        test('string literal, base 26', () => expect(int('0b11', 26)).toEqual(7463));
        test('string literal, base 27', () => expect(int('0b11', 27)).toEqual(8047));
        test('string literal, base 28', () => expect(int('0b11', 28)).toEqual(8653));
        test('string literal, base 29', () => expect(int('0b11', 29)).toEqual(9281));
        test('string literal, base 30', () => expect(int('0b11', 30)).toEqual(9931));
        test('string literal, base 31', () => expect(int('0b11', 31)).toEqual(10603));
        test('string literal, base 32', () => expect(int('0b11', 32)).toEqual(11297));
        test('string literal, base 33', () => expect(int('0b11', 33)).toEqual(12013));
        test('string literal, base 34', () => expect(int('0b11', 34)).toEqual(12751));
        test('string literal, base 35', () => expect(int('0b11', 35)).toEqual(13511));
        
        test('string literal, no base, throws', () => expect(() => int('0b11')).toThrow(new ValueError(`invalid literal for int() with base 10: '0b11'`)));
        
    });
    describe('hexadecimal numbers', () => {
        test('number, no base', () => expect(int(0x1)).toEqual(1));
        test('number, base 0 throws', () => expect(() => int(0x1, 0)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        test('number, base 1 throws', () => expect(() => int(0x1, 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0")));
        let base = chance.integer({min: 2, max: 36});
        test(`number, base ${base} throws`, () => expect(() => int(0x1, base)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        test('string literal, base 2 throws', () => expect(() => int('0x1', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0x1'`)));
        test('string literal, base 0', () => expect(int('0x1', 0)).toEqual(1));
        test('string literal, no base throws', () => expect(() => int('0x1')).toThrow(new ValueError(`invalid literal for int() with base 10: '0x1'`)));
        test('string literal, base 3 throws', () => expect(() => int('0x1', 3)).toThrow(new ValueError(`invalid literal for int() with base 3: '0x1'`)));
    });
});

describe('literal_tricky_bases', () => {
    
    test('("00", 0)', () => expect(int("00", 0)).toEqual(0));
    test('("07", 10)', () => expect(int("07", 10)).toEqual(7));
    test('("07", 8)', () => expect(int("07", 8)).toEqual(7));
    test('("016", 7)', () => expect(int("016", 7)).toEqual(13));
    test('("02", 3)', () => expect(int("02", 3)).toEqual(2));
    test('("33", 4)', () => expect(int("33", 4)).toEqual(15));
    test('("033", 4)', () => expect(int("033", 4)).toEqual(15));
    test('throw ValueError', () => {
        expect(() => int("07", 5)) // parseInt("07", 5) => 0
            .toThrow(new ValueError(`invalid literal for int() with base 5: '07'`));
        expect(() => int("07", 0))
            .toThrow(new ValueError(`invalid literal for int() with base 0: '07'`));
        
        
        expect(() => int("016", 6)) // parseInt("016", 6) => 1
            .toThrow(new ValueError(`invalid literal for int() with base 6: '016'`));
        
        
        expect(() => int("02", 2)) // parseInt("02", 2) => 0
            .toThrow(new ValueError(`invalid literal for int() with base 2: '02'`));
        
        expect(() => int("033", 2))
            .toThrow(new ValueError(`invalid literal for int() with base 2: '033'`));
        expect(() => int("33", 2))
            .toThrow(new ValueError(`invalid literal for int() with base 2: '33'`));
        
        expect(() => int("034", 4)).toThrow(new ValueError(`invalid literal for int() with base 4: '034'`));
        
        expect(() => int("01", 0)) // parseInt("01", 0) => 1
            .toThrow(new ValueError(`invalid literal for int() with base 0: '01'`));
        expect(() => int("-01", 0)) // parseInt("-01", 0) => -1
            .toThrow(new ValueError(`invalid literal for int() with base 0: '-01'`));
    });
    
    
});
describe('ValueError misc', () => {
    // \pypy\objspace\std\test\test_intobject.py test_leading_zero_literal()
    test('pypy/objspace/std/test/test_intobject.py test_leading_zero_literal()', () => {
        const invalids = [
            ["07777777777777777777777777777777777777", 0],
            ["00000000000000000000000000000000000007", 0],
            ["00000000000000000077777777777777777777", 0],
        ];
        for (let [val, base] of invalids) {
            expect(() => int(val, base))
                .toThrow(new ValueError(`invalid literal for int() with base ${base === undefined ? 10 : base}: '${val}'`));
        }
        
        
    });
    
    describe('invalid literal', () => {
        test(`("")`, () => expect(() => int("")).toThrow(new ValueError(`invalid literal for int() with base 10: ''`)));
        test(`('')`, () => expect(() => int('')).toThrow(new ValueError(`invalid literal for int() with base 10: ''`)));
        test('(``)', () => expect(() => int(``)).toThrow(new ValueError(`invalid literal for int() with base 10: ''`)));
        test(`(" ")`, () => expect(() => int(" ")).toThrow(new ValueError(`invalid literal for int() with base 10: ' '`)));
        test(`(' ')`, () => expect(() => int(' ')).toThrow(new ValueError(`invalid literal for int() with base 10: ' '`)));
        test('(` `)', () => expect(() => int(` `)).toThrow(new ValueError(`invalid literal for int() with base 10: ' '`)));
        test(`('  \t\t  ')`, () => expect(() => int('  \t\t  ')).toThrow(new ValueError(`invalid literal for int() with base 10: '  \t\t  '`)));
        test(`("+ 314")`, () => expect(() => int("+ 314", undefined, true)).toThrow(new ValueError(`invalid literal for int() with base 10: '+ 314'`)));
        test(`("+ 314", undefined)`, () => expect(() => int("+ 314", undefined)).toThrow(new ValueError(`invalid literal for int() with base 10: '+ 314'`)));
        test(`("+ 314", 25)`, () => expect(() => int("+ 314", 25)).toThrow(new ValueError(`invalid literal for int() with base 25: '+ 314'`)));
        test(`("+ 314", 10)`, () => expect(() => int("+ 314", 10)).toThrow(new ValueError(`invalid literal for int() with base 10: '+ 314'`)));
        test(`("+ 314", 0)`, () => expect(() => int("+ 314", 0)).toThrow(new ValueError(`invalid literal for int() with base 0: '+ 314'`)));
        // letter: 'x',
        // isBinary: false,
        // isOctal: false,
        // isHexaDecimal: false,
        // isSpecial: false,
        // specialBase: undefined,
        // mod: NaN,
        // isFloat: false,
        // 'nosign[0]: ': '1',
        // 'RegExp(/[a-zA-Z]/).test(letter)': true,
        // 'parseInt(x, base)': 1
        test(`('  1x')`, () => expect(() => int('  1x', undefined, true)).toThrow(new ValueError(`invalid literal for int() with base 10: '  1x'`)));
        test(`('_1')`, () => expect(() => int('_1')).toThrow(new ValueError(`invalid literal for int() with base 10: '_1'`)));
        // letter: '.',
        // isBinary: false,
        // isOctal: false,
        // isHexaDecimal: false,
        // isSpecial: false,
        // specialBase: undefined,
        // mod: 0.5,
        // isFloat: true,
        // 'nosign[0]: ': '1',
        // 'RegExp(/[a-zA-Z]/).test(letter)': false,
        // 'parseInt(x, base)': 1
        test(`('1.5')`, () => expect(() => int('1.5')).toThrow(new ValueError(`invalid literal for int() with base 10: '1.5'`)));
        test(`('15.0')`, () => expect(() => int('15.0')).toThrow(new ValueError(`invalid literal for int() with base 10: '15.0'`)));
        // letter: '.',
        // isBinary: false,
        // isOctal: false,
        // isHexaDecimal: false,
        // isSpecial: false,
        // specialBase: undefined,
        // mod: -0.5,
        // isFloat: true,
        // 'nosign[0]: ': '1',
        // 'RegExp(/[a-zA-Z]/).test(letter)': false,
        // 'parseInt(x, base)': -1
        test(`('-1.5')`, () => expect(() => int('-1.5')).toThrow(new ValueError(`invalid literal for int() with base 10: '-1.5'`)));
        test(`('-15.0')`, () => expect(() => int('-15.0')).toThrow(new ValueError(`invalid literal for int() with base 10: '-15.0'`)));
        test(`('hello5')`, () => expect(() => int('hello5')).toThrow(new ValueError(`invalid literal for int() with base 10: 'hello5'`)));
        // TODO:
        //  ['  1\02  ', ValueError],
        //  ["\u0200", ValueError]
        
    });
    test('base out of range', () => {
        for (let [val, base] of [["+ 314", 1], ["+ 314", 37]]) {
            expect(() => int(val, base)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0"));
        }
    });
    
    
});
describe('TypeError misc', () => {
    test('argument must be', () => {
        const badargs = [
            [int],
            [null],
            [[]],
        ];
        for (let [val, base] of badargs) {
            expect(() => int(val, base))
                .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeof val}'`));
        }
    });
    test('cannot be interpreted', () => {
        expect(() => int("+ 314", null))
            .toThrow(new TypeError(`'null' object cannot be interpreted as an integer`));
        
    });
    test(`can't convert`, () => {
        const badargs = [
            [5, 5],
        ];
        for (let [val, base] of badargs) {
            expect(() => int(val, base))
                .toThrow(new TypeError(`int() can't convert non-string with explicit base`));
        }
    });
    
    
});


