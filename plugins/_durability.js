export async function before(m) {
    let user = global.db.data.users[m.sender]

    //Sword
    if (user.sword > 0) {
        if (user.sworddurability < 1) {
            user.sworddurability = 50
            user.sword -= 1
        }
    }
    if (user.sword == 0) {
        user.sworddurability = 0
    }

    //Pickaxe
    if (user.pickaxe > 0) {
        if (user.pickaxedurability < 1) {
            user.pickaxedurability = 50
            user.pickaxe -= 1
        }
    }
    if (user.pickaxe == 0) {
        user.pickaxedurability = 0
    }

    //Armor
    if (user.armor > 0) {
        if (user.armordurability < 1) {
            user.armordurability = 50
            user.armor -= 1
        }
    }
    if (user.armor == 0) {
        user.armordurability = 0
    }

    //Fishingrod
    if (user.fishingrod > 0) {
        if (user.fishingroddurability < 1) {
            user.fishingroddurability = 50
            user.fishingrod -= 1
        }
    }
    if (user.fishingrod == 0) {
        user.fishingroddurability = 0
    }

    //Atm
    if (user.atm > 0) {
        if (user.fullatm < 1) {
            user.fullatm = 1000000000
            user.atm -= 1
        }
    }
    if (user.atm == 0) {
        user.fullatm = 0
    }
}
