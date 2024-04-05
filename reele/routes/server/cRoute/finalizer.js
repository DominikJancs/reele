async function finalizer(req, res) {
    if (req.finalize) res.status(201).json("Successfully uploaded!");
    else res.status(500).json("Something went wrong!");
}

exports.finalizer = finalizer;