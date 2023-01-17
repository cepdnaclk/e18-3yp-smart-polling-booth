const mongoose = require('mongoose');
const { Voter } = require('../models/voter');
const { Division } = require('../models/division');

describe('Voter model', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a voter', async () => {
        const division = await Division.create({ name: 'Division 1' });
        const voter = await Voter.create({
            fname: 'John',
            lname: 'Doe',
            division: division._id,
            nic: '1234567890',
            regDate: new Date(),
            fingerprintImg: 'fingerprint.jpg',
            faceRecImg: 'face.jpg',
            contactNumber: 1234567890
        });

        expect(voter.fname).toEqual('John');
        expect(voter.lname).toEqual('Doe');
        expect(voter.division.toString()).toEqual(division._id.toString());
        expect(voter.nic).toEqual('1234567890');
        expect(voter.regDate).toBeInstanceOf(Date);
        expect(voter.fingerprintImg).toEqual('fingerprint.jpg');
        expect(voter.faceRecImg).toEqual('face.jpg');
        expect(voter.isVoted).toEqual(false);
        expect(voter.contactNumber).toEqual(1234567890);
    });
});
