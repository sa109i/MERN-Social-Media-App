import User from "../models/user.js"

export const getUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)

    res.status(200).json({ msg: "success", user }) 
}

export const getUserFriends = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    )

    // console.log(friends)

    res.status(200).json({ friends })
}

export const addRemoveFriend = async (req, res) => {
    try{
        const { id, friendId } = req.body
        
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter(
                (id) => id !== friendId
            )
            friend.friends = friend.friends.filter(
                (id) => id !== id
            )
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        getUserFriends(req, res)

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}