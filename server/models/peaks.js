'use strict';

module.exports = function(sequelize, DataTypes) {
  var Peaks = sequelize.define('Peaks', {
    p_id: {type: DataTypes.STRING, primaryKey: true},
    bac_id: {type: DataTypes.STRING},
    mz: DataTypes.DOUBLE,
    rel_intensity: DataTypes.DOUBLE,
    intensity: DataTypes.DOUBLE,
    no: DataTypes.INTEGER,
    snr: DataTypes.DOUBLE
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Peaks.belongsTo(models.Bacteria, {
          onDelete: 'CASCADE',
          foreignKey: 'bac_id',
          constraints: false,
          as: 'bacteria'
        });
      }
    }
  });

  return Peaks;
};
