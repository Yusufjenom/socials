import User from '../models/User.js';


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: error.message
        })
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occupation, location, picturePath }) => {
                return { _id, firstname, lastname, occupation, location, picturePath }
            }
        );
        res.status(200).json({
            success: true,
            formattedFriends
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: error.message
        });
    }
};

export const addRemoveFriend = async (req, res) => {
    try {
    const {id, friendId} = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if(user.friends.includes(friendId)){
        user.friends = user.friends.filter(id => id !== friendId);
        friend.friends = friend.friends.filter(id => id !== id);
    }else{
        user.friends.push(friendId);
        friend.friends.push(id)
    };

    await user.save();
    await friend.save();

    const friends = await Promise.all(
        user.friends.map(id => User.findById(id))
    );

    const formattedFriends = friends.map(
        ({ _id, firstname, lastname, occupation, location, picturePath }) => {
            return { _id, firstname, lastname, occupation, location, picturePath }
        }
    );

    res.status(200).json({
        success: true,
        formattedFriends
    });

    } catch (error) {
        res.status(404).json({
            success: false,
            msg: error.message
        })
    }
}