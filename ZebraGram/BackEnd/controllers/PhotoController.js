const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require('../models/User')

// Insert photo with an user 
const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;
    const reqUser = req.user;

    try {
        const user = await User.findById(reqUser._id);

        // create a photo
        const newPhoto = await Photo.create({
            image,
            title,
            userId: user._id,
            userName: user.name
        });

        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(422).json({ errors: ["Houve um erro, por favor, tente novamente mais tarde"] });
    }
}

// delete photo
const deletePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        // check if photo exists
        if (!photo) {
            return res.status(404).json({ errors: ["Foto não encontrada"] });
        }

        // check if photo belongs to user
        if (!photo.userId.equals(reqUser._id)) {
            return res.status(422).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
        }

        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    }
}

// get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// get user photos
const getUserPhotos = async(req,res) => {
  
  const {id} = req.params
  const photos = await Photo.find({userId: id}).sort([['createdAt', -1]]).exec()

  res.status(200).json(photos)
 
}

// get photo by id
const getPhotoById = async (req,res) => {
  
  const { id } = req.params
  const photo = await Photo.findById(mongoose.Types.ObjectId(id))


  // check if photo exists
  if(!photo) {
    res.status(404).json({errors: ['foto não encontrada']})
    return
  }

  res.status(200).json(photo)
  
}

// Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let image;

  if (req.file) {
    image = req.file.filename;
  }

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  if (image) {
    photo.image = image;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};


// Like photo
const likePhoto = async(req,res) =>  {

  const { id } = req.params

  const reqUser = req.user

  const photo = await Photo.findById(id)

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // check if user already like the photo
  if(photo.likes.includes(reqUser._id)) {
    res.status(422).json({errros: ["Você ja curtiu a foto"]})
    return
  }

  // put user id in likes array 
  photo.likes.push(reqUser._id)
  photo.save()

  res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto foi curtida" })

}

// Comment a photo
const commentAPhoto = async(req,res) => {

    const { id } = req.params
    const {comment} = req.body

    const reqUser = req.user

    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)


     // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    // Put comment in array
    const userComment = {
      comment, 
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id
    }

    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json({comment: userComment, message: "O comentário foi adicionado com sucesso"})

}

// Search a photo by title 
const searchAPhoto = async(req,res) => {
  const { q } = req.query

  const photos =  await Photo.find({title: new RegExp(q, "i")}).exec()

  res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentAPhoto,
    searchAPhoto
}
