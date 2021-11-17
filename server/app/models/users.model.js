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

  const departamento = sequelize.define("departamento", {
    ID_departamento: { type: Sequelize.INTEGER, primaryKey: true },
    nombre: { type: Sequelize.STRING, allowNull: false },
    horario: Sequelize.STRING, //String?
  });

  const pertenece = sequelize.define("pertenece", {
    ID_contrato_c: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: contrato,
        key: "ID_contrato",
      },
    },
    ID_departamento_d: {
      type: Sequelize.INTEGER,
      primaryKey: true, //!PrimaryKey?
      references: {
        model: departamento,
        key: "ID_departamento",
      },
    },
  });

  const empezar = sequelize.define("empezar", {
    RUT_e: {
      type: Sequelize.STRING,
      primaryKey: true,
      references: {
        model: empleado,
        key: "RUT",
      },
    },
    timestamp: { type: Sequelize.DATE, primaryKey: true },
  });

  const terminar = sequelize.define("terminar", {
    RUT_e: {
      type: Sequelize.STRING,
      primaryKey: true,
      references: {
        model: empleado,
        key: "RUT",
      },
    },
    timestamp: { type: Sequelize.DATE, primaryKey: true },
  });

  const horas_semana = sequelize.define("horas_semana", {
    RUT_e: {
      type: Sequelize.STRING,
      primaryKey: true,
      references: {
        model: empleado,
        key: "RUT",
      },
    },
    horas: { type: Sequelize.INTEGER, allowNull: false },
  });

  return (
    empleado,
    estado,
    pago,
    contrato,
    tiene,
    departamento,
    pertenece,
    empezar,
    terminar,
    horas_semana
  );
};
