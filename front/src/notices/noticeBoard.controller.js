const noticeboardService = require("./noticeBoard.service");

// getList
exports.getList = async (req, res, next) => {
  try {
    const { data } = await noticeboardService.getList();
    res.render("notices/list.html", { list: data });
  } catch (e) {
    next(e);
  }
};

// getWrite
exports.getWrite = (req, res) => {
  res.render("notices/write.html");
};

// postWrite
exports.postWrite = async (req, res, next) => {
  try {
    // const tmp = {};
    // tmp["title"] = req.body.title;
    // tmp["content"] = req.body.content;
    // tmp["author"] = req.body.author;
    // tmp["date"] = Date.now();
    // tmp["hit"] = 1;
    // tmp["category"] = 1;
    // tmp["img"] = "ASda";
    // tmp["like"] = 1;
    // tmp["createdAt"] = Date.now();
    // tmp["updatedAt"] = Date.now();
    // const { data } = await noticeboardService.postWrite(tmp);
    const data = req.body;
    const file = req.file;
    const boardData = {
      title: data.title,
      author: data.author,
      content: data.content,
      category: data.category,
      image: file.filename,
      orignial_filename: file.orignial_filename,
    };
    const result = await noticeboardService.postWrite(boardData);
    const { id } = result.data;
    res.redirect(`./view?id=${id}`);
  } catch (e) {
    next(e);
  }
};

// getView
exports.getView = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { data } = await noticeboardService.getView(id);
    res.render("notices/view.html", { data: data });
  } catch (e) {
    next(e);
  }
};

// postmodify
exports.getModify = (req, res) => {
  const { id } = req.query;
  res.render("notices/modify.html", { id });
};

exports.postModify = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data1 = req.body;
    // const tmp = {};
    // tmp["title"] = req.body.title;
    // tmp["content"] = req.body.content;
    // tmp["author"] = req.body.author;

    const boardData = {
      title: data1.title,
      author: data1.author,
      content: data1.content,
    };

    const { data } = await noticeboardService.postModify(id, boardData);
    res.redirect(`./view?id=${id}`);
  } catch (e) {
    next(e);
  }
};

// post Delete
exports.postDelete = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { data } = await noticeboardService.postDelete(id);
    console.log(`postDelete controller result :`, data);
    res.redirect(`./`);
  } catch (e) {
    next(e);
  }
};
