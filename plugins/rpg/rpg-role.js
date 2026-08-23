const handler = m => m;

handler.before = function (m) {
    const user = global.db.data.users[m.sender];
    const levels = [
        { min: 0, max: 2, role: 'Newbie ㋡' },
        { min: 2, max: 4, role: 'Beginner Grade 1 ⚊¹' },
        { min: 4, max: 6, role: 'Beginner Grade 2 ⚊²' },
        { min: 6, max: 8, role: 'Beginner Grade 3 ⚊³' },
        { min: 8, max: 10, role: 'Beginner Grade 4 ⚊⁴' },
        { min: 10, max: 20, role: 'Private Grade 1 ⚌¹' },
        { min: 20, max: 30, role: 'Private Grade 2 ⚌²' },
        { min: 30, max: 40, role: 'Private Grade 3 ⚌³' },
        { min: 40, max: 50, role: 'Private Grade 4 ⚌⁴' },
        { min: 50, max: 60, role: 'Private Grade 5 ⚌⁵' },
        { min: 60, max: 70, role: 'Corporal Grade 1 ☰¹' },
        { min: 70, max: 80, role: 'Corporal Grade 2 ☰²' },
        { min: 80, max: 90, role: 'Corporal Grade 3 ☰³' },
        { min: 90, max: 100, role: 'Corporal Grade 4 ☰⁴' },
        { min: 100, max: 110, role: 'Corporal Grade 5 ☰⁵' },
        { min: 110, max: 120, role: 'Sergeant Grade 1 ≣¹' },
        { min: 120, max: 130, role: 'Sergeant Grade 2 ≣²' },
        { min: 130, max: 140, role: 'Sergeant Grade 3 ≣³' },
        { min: 140, max: 150, role: 'Sergeant Grade 4 ≣⁴' },
        { min: 150, max: 160, role: 'Sergeant Grade 5 ≣⁵' },
        { min: 160, max: 170, role: 'Staff Grade 1 ﹀¹' },
        { min: 170, max: 180, role: 'Staff Grade 2 ﹀²' },
        { min: 180, max: 190, role: 'Staff Grade 3 ﹀³' },
        { min: 190, max: 200, role: 'Staff Grade 4 ﹀⁴' },
        { min: 200, max: 210, role: 'Staff Grade 5 ﹀⁵' },
        { min: 210, max: 220, role: 'Sergeant Grade 1 ︾¹' },
        { min: 220, max: 230, role: 'Sergeant Grade 2 ︾²' },
        { min: 230, max: 240, role: 'Sergeant Grade 3 ︾³' },
        { min: 240, max: 250, role: 'Sergeant Grade 4 ︾⁴' },
        { min: 250, max: 260, role: 'Sergeant Grade 5 ︾⁵' },
        { min: 260, max: 270, role: '2nd Lt. Grade 1 ♢¹' },
        { min: 270, max: 280, role: '2nd Lt. Grade 2 ♢²' },
        { min: 280, max: 290, role: '2nd Lt. Grade 3 ♢³' },
        { min: 290, max: 300, role: '2nd Lt. Grade 4 ♢⁴' },
        { min: 300, max: 310, role: '2nd Lt. Grade 5 ♢⁵' },
        { min: 310, max: 320, role: '1st Lt. Grade 1 ♢♢¹' },
        { min: 320, max: 330, role: '1st Lt. Grade 2 ♢♢²' },
        { min: 330, max: 340, role: '1st Lt. Grade 3 ♢♢³' },
        { min: 340, max: 350, role: '1st Lt. Grade 4 ♢♢⁴' },
        { min: 350, max: 360, role: '1st Lt. Grade 5 ♢♢⁵' },
        { min: 360, max: 370, role: 'Major Grade 1 ✷¹' },
        { min: 370, max: 380, role: 'Major Grade 2 ✷²' },
        { min: 380, max: 390, role: 'Major Grade 3 ✷³' },
        { min: 390, max: 400, role: 'Major Grade 4 ✷⁴' },
        { min: 400, max: 410, role: 'Major Grade 5 ✷⁵' },
        { min: 410, max: 420, role: 'Colonel Grade 1 ✷✷¹' },
        { min: 420, max: 430, role: 'Colonel Grade 2 ✷✷²' },
        { min: 430, max: 440, role: 'Colonel Grade 3 ✷✷³' },
        { min: 440, max: 450, role: 'Colonel Grade 4 ✷✷⁴' },
        { min: 450, max: 460, role: 'Colonel Grade 5 ✷✷⁵' },
        { min: 460, max: 470, role: 'Brigadier Early ✰' },
        { min: 470, max: 480, role: 'Brigadier Silver ✩' },
        { min: 480, max: 490, role: 'Brigadier Gold ✯' },
        { min: 490, max: 500, role: 'Brigadier Platinum ✬' },
        { min: 500, max: 600, role: 'Brigadier Diamond ✪' },
        { min: 600, max: 700, role: 'Legendary 忍' },
        { min: 700, max: 800, role: 'Legendary 忍忍' },
        { min: 800, max: 900, role: 'Legendary 忍忍忍' },
        { min: 900, max: 1000, role: 'Legendary 忍忍忍忍' },
        { min: 1000, max: Infinity, role: 'Master 숒 × Legendary 숒' }
    ];

    const userLevel = user.level;
    const userRole = levels.find(level => userLevel >= level.min && userLevel <= level.max).role;

    user.role = userRole;
    return true;
};

export default handler;
