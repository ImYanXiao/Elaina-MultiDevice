export async function before(m) {
    let user = global.db.data.users[m.sender]

    if (user.cat > 0 && user.money >= (99999999 + (user.cat * 4000000))) {
        let money = user.money - (99999999 + (user.cat * 4000000))
        user.money = 99999999 + (user.cat * 4000000)
        user.bank += money
    } else if (user.cat == 0 && user.money >= 99999999) {
        let money = user.money - 99999999
        user.money = 99999999
        user.bank += money
    } else if (user.money < 0) {
        user.money = 0
    }

    if (user.limit > 999) {
        let limit = user.limit-1000
        user.limit = 1000
        user.exp += limit * 10000
    } else if (user.limit < 0) {
        user.limit = 0
    }

    if (user.health > 100) {
        user.health = 100
    } else if (user.health < 0) {
        user.health = 0
    }

    if (user.cat > 10) {
        user.cat = 10
    } else if (user.cat < 0) {
        user.cat = 0
    }

    if (user.dog > 10) {
        user.dog = 10
    } else if (user.dog < 0) {
        user.dog = 0
    }
}