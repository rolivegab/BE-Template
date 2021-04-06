import { Contract } from '../models/Contract';
import { Job } from '../models/Job';
import { Profile } from '../models/Profile';

// Associations
Contract.belongsTo(Profile, {as: 'Contractor'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)
Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})