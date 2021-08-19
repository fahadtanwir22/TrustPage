const { Subprocessor } = require("../models");

module.exports.addSubprocessor = async (data) => {
  const { name, purpose, location } = data;
  try {
    const subprocessor = await Subprocessor.create({
      name,
      purpose,
      location,
    });

    return { status: 200, data: subprocessor };
  } catch (e) {
    return { status: 400, error: e };
  }
};

module.exports.getAllSubprocessors = async () => {
  try {
    const response = await Subprocessor.findAll();
    return { status: 200, data: response };
  } catch (e) {
    return { status: 400, error: e };
  }
};

module.exports.deleteSubProcessor = async (id) => {
  try {
    const response = await Subprocessor.destroy({
      where: {
        id: id,
      },
    });
    if (response) {
      return { status: 200, messgae: "Data Removed" };
    } else {
      return { status: 404, messgae: "Not Found" };
    }
  } catch (e) {
    return { status: 400, error: e };
  }
};

module.exports.updateSubProcessor = async (id, data) => {
  try {
    const response = await Subprocessor.update(data, { where: { id: id } });
    if (response[0]) {
      return { status: 200, messgae: "Data Updated" };
    } else {
      return { status: 404, messgae: "Not Found" };
    }
  } catch (e) {
    return { status: 400, error: e };
  }
};
