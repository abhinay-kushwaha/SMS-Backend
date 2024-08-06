// const User = require('../model/Usermodel');

// // Get Profile Data
// const getProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select('-password');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Upload Profile Image
// const uploadProfileImage = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const imagePath = req.file.path.replace('uploads\\', 'uploads/'); // Adjust path for Windows

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.image = imagePath;
//     await user.save();

//     res.json(user);
//   } catch (error) {
//     console.error('Error uploading profile image:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { getProfile, uploadProfileImage };
