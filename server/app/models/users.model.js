module.exports = (sequelize, Sequelize) => {
  const empleado = sequelize.define("empleado", {
    RUT: {
      type: Sequelize.STRING, //Algo para asegurar que sea valido?
      primaryKey: true,
    },
    nombre: { type: Sequelize.STRING, allowNull: false },
    apellido: { type: Sequelize.STRING, allowNull: false },
    fecha_nacimiento: Sequelize.DATE,
    telefono: Sequelize.STRING, //Puede ser integrer pero esta el '+'?
    email: { type: Sequelize.STRING, allowNull: false },
    dias_libres: { type: Sequelize.INTEGER, allowNull: false },
  });
  const estado = sequelize.define("estado", {
    RUT_e: {
      type: Sequelize.STRING,
      primaryKey: true,
      references: {
        model: empleado,
        key: "RUT",
      },
    },
    estado: {
      type: Sequelize.STRING,
      verify: {
        isIn: [["trabajo", "vacaciones", "licencia"]],
      },
    },
    fecha_fin_estado: Sequelize.DATE,
    dias_libres_restantes: Sequelize.INTEGER,
  });
  const pago = sequelize.define("pago", {
    ID_pago: { type: Sequelize.INTEGER, primaryKey: true },
    RUT_e: {
      type: Sequelize.STRING,
      references: {
        model: empleado,
        key: "RUT",
      },
    },
    fecha: { type: Sequelize.DATE, allowNull: false },
    monto: { type: Sequelize.INTEGER, allowNull: false },
  });
  const contrato = sequelize.define("contrato", {
    ID_contrato: { type: Sequelize.INTEGER, primaryKey: true },
    sueldo: { type: Sequelize.INTEGER, allowNull: false },
    horas_jornada: { type: Sequelize.INTEGER, allowNull: false },
    dias_libres: { type: Sequelize.INTEGER, allowNull: false },
    cargo: { type: Sequelize.STRING, allowNull: false },
    p_horas_extras: { type: Sequelize.INTEGER, allowNull: false },
  });
  const tiene = sequelize.define("tiene", {
    RUT_e: {
      type: Sequelize.STRING,
      primaryKey: true,
      references: {
        model: empleado,
        key: "RUT",
      },
    },
    ID_contrato_c: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: contrato,
        key: "ID_contrato",
      },
    },
  });
  /*
  departamento(ID_departamento, nombre, horario)
    nombre NOT NULL
pertenece(ID_contrato_c, ID_departamento_d)
    FK: ID_contrato_c -> contrato(ID_contrato) 
          ID_departamento_d -> departamento(ID_departamento)
empezar(RUT_e, timestamp)
    FK: RUT_e -> empleado(RUT)
terminar(RUT_e, timestamp)
    FK: RUT_e -> empleado(RUT)
horas_semana(RUT_e, fecha, horas)
    FK: RUT_e -> empleado(RUT)
    horas NOT NULL
  */

  return; //!TODO: return the model
};
