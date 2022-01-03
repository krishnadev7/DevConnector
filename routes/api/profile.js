const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const { check, validationResult} = require('express-validator')

//@route GET api/profile/me
// desc get currnt users profile
// @access private
router.get('/me',auth, async(req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id}).populate(
            'user',
            ['name','avatar']
        );
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
        res.json(profile);
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
});
//@route POST api/profile/me
// desc create or update user profile
// @access private

router.post('/', [auth,[
    check('status', 'Status is required').not().isEmpty(),
    check('skills','skills is required').not().isEmpty()
]
],
async(req, res) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
     }

     const {
         company,
         website,
         location,
         bio,
         status,
         githubusername,
         skills,
         youtube,
         facebook,
         twitter,
         instagram,
         linkedin,
     } = req.body;

     // build profile object

     const profileField = {};
     profileField.user = req.user.id;
     if(company) profileField.company = company;
     if(website) profileField.website = website;
     if (location) profileField.location = location;
     if(bio) profileField.location = bio;
     if(status) profileField.location = status;
     if(githubusername) profileField.location = githubusername;
     if(skills){
         profileField.skills = skills.split(',').map(skill => skill.trim());
     }

     // build social object

      profileField.social = {}
      if(twitter) profileField.social.twitter = twitter;
      if(youtube) profileField.social.youtube = youtube;
      if (instagram) profileField.social.instagram = instagram;
      if (facebook) profileField.social.facebook = facebook;
      if (linkedin) profileField.social.linkedin = linkedin;

    try{
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            // update
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileField},
                {new: true}
            )
            return res.json(profile)
        }

        //create
        profile = new Profile(profileField)
        await profile.save()
        res.json(profile)

    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }

}
)


module.exports = router;
