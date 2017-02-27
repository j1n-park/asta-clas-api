'use strict';

module.exports = function(sequelize, DataTypes) {
  var Bacteria = sequelize.define('Bacteria', {
    bac_id: {type: DataTypes.STRING, primaryKey: true},
    genus: DataTypes.STRING,
    species: DataTypes.STRING,
    strain: DataTypes.STRING,
    exp_desc: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Bacteria.hasMany(models.Peaks, {
          as: 'peaks',
          foreignKey: 'bac_id',
          constraints: false
        })
      }
    }
  });

  return Bacteria;
};
