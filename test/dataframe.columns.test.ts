import { assert, expect } from 'chai';
import 'mocha';
import { Index } from '../lib/index';
import { DataFrame } from '../lib/dataframe';
import { ArrayIterable } from '../lib/iterables/array-iterable';

describe('DataFrame columns', () => {

    it('can get column name from empty dataframe - no params', ()  => {

        var dataFrame = new DataFrame();

        expect(dataFrame.getColumnNames()).to.eql([]);
    });
    
    it('can get column name from empty dataframe - array', ()  => {

        var dataFrame = new DataFrame([]);

        expect(dataFrame.getColumnNames()).to.eql([]);
    });

    it('can get column name from empty dataframe - config', ()  => {

        var dataFrame = new DataFrame({});

        expect(dataFrame.getColumnNames()).to.eql([]);
    });

    it('can get column name from first object in array', ()  => {

        var dataFrame = new DataFrame([
            {
                A: 1,
                B: 10,
            },
            {
                C: 2,
                D: 20,
            }
        ]);

        expect(dataFrame.getColumnNames()).to.eql(["A", "B"]);
    });

    it('can get column name from first object in config values iterable', ()  => {

        var dataFrame = new DataFrame({
            values: new ArrayIterable([
                {
                    A: 1,
                    B: 10,
                },
                {
                    C: 2,
                    D: 20,
                }
            ])
        });

        expect(dataFrame.getColumnNames()).to.eql(["A", "B"]);
    });

    it('can get column name from first item in pairs iterable', ()  => {

        var dataFrame = new DataFrame({
            pairs: new ArrayIterable([
                [
                    100, 
                    {
                        A: 1,
                        B: 10,
                    },
                ],
                [
                    200,
                    {
                        C: 2,
                        D: 20,
                    }
                ]
            ])
        });

        expect(dataFrame.getColumnNames()).to.eql(["A", "B"]);
    });

    it('select can rewrite column names', () => {

        var dataFrame = new DataFrame([
            {
                A: 1,
                B: 10,
            },
            {
                A: 2,
                B: 20,
            }
        ]);

        var modified = dataFrame.select(v => ({ X: v.A, Y: v.B }));
        expect(modified.getColumnNames()).to.eql(["X", "Y"]);
        expect(modified.toArray()).to.eql([
            {
                X: 1,
                Y: 10,
            },
            {
                X: 2,
                Y: 20,
            }
        ]);
    });

});