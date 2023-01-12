const mocha = require('mocha');
const assert = require('assert');
const mongoose = require('mongoose');
const Province = require('../models/province');
const District = require('../models/district').District;

describe('District Model', () => {
    before(async () => {
        await mongoose.connect('mongodb://localhost:27017/testDatabase');
    });

    after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create and save a district', async () => {
        const province = new Province({ name: 'Western' });
        await province.save();
        const district = new District({
            name: 'Colombo',
            regVoteCount: 100000,
            provinceID: province._id
        });
        await district.save();
        assert(district.isNew === false);
    });

    it('should throw validation error if district name is not provided', async () => {
        const district = new District({ regVoteCount: 100000 });
        try {
            await district.save();
        } catch (error) {
            assert(error.errors.name.kind === 'required');
        }
    });

    it('should throw validation error if district name is not unique', async () => {
        const district1 = new District({
            name: 'Colombo',
            regVoteCount: 100000
        });
        const district2 = new District({
            name: 'Colombo',
            regVoteCount: 100000
        });
        try {
            await district1.save();
            await district2.save();
        } catch (error) {
            assert(error.errors.name.kind === 'unique');
        }
    });

    it('should throw validation error if district name is not in the enum list', async () => {
        const district = new District({
            name: 'Invalid',
            regVoteCount: 100000
        });
        try {
            await district.save();
        } catch (error) {
            assert(error.errors.name.kind === 'enum');
        }
    });

    it('should throw validation error if province ID is not provided', async () => {
        const district = new District({
            name: 'Colombo',
            regVoteCount: 100000
        });
        try {
            await district.save();
        } catch (error) {
            assert(error.errors['provinceID'].kind === 'required');
        }
    });

    it('should throw validation error if regVoteCount is not provided', async () => {
        const district = new District({ name: 'Colombo' });
        try {
            await district.save();
        } catch (error) {
            assert(error.errors.regVoteCount.kind === 'required');
        }
    });
});
