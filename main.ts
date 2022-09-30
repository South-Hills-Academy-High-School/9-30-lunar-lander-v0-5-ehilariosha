namespace SpriteKind {
    export const map = SpriteKind.create()
    export const rocketengine = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    apple.ay = 25 * Math.sin(angle)
    apple.ax = 25 * Math.cos(angle)
    fireball.setFlag(SpriteFlag.Invisible, false)
    rocketflag = 1
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    angle += 15 * (3.14 / 180)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.darkGroundNorthWest1, function (sprite, location) {
    if (Math.abs(apple.vx) > 20 || apple.vy > 50) {
        boom = sprites.create(img`
            . 3 . . . . . . . . . . . 4 . . 
            . 3 3 . . . . . . . . . 4 4 . . 
            . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
            . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
            . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
            . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
            . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
            . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
            . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
            . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
            . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
            . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
            . 4 4 d d 4 d d d 4 3 d d 4 . . 
            . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
            . 4 5 4 . . 4 4 4 . . . 4 4 . . 
            . 4 4 . . . . . . . . . . 4 4 . 
            `, SpriteKind.Projectile)
        boom.setPosition(apple.x, apple.y)
        scene.cameraFollowSprite(boom)
        music.bigCrash.playUntilDone()
        pause(1000)
        game.over(false)
    } else {
        if (landingflag == 0) {
            fuel += 100
            landingflag = 1
        }
    }
    apple.setVelocity(0, -1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    angle += -15 * (3.14 / 180)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    apple.ay = 20
    fireball.setFlag(SpriteFlag.Invisible, true)
    rocketflag = 0
})
let boom: Sprite = null
let apple: Sprite = null
let angle = 0
let fireball: Sprite = null
let landingflag = 0
let rocketflag = 0
let fuel = 1000
let fuelSprite = textsprite.create(convertToText(fuel))
rocketflag = 0
landingflag = 0
fireball = sprites.create(img`
    . . . . . . 3 3 . . . . . . . . 
    . . . . . . 3 1 3 . . . . . . . 
    . . 3 3 . . 3 1 3 . . 3 3 . . . 
    . . 3 1 3 . 3 1 3 2 3 1 3 . . . 
    . . . 3 1 3 3 1 3 2 1 3 . . . . 
    3 3 3 3 2 1 3 1 1 1 3 . . . . . 
    3 1 1 1 1 1 1 1 1 2 3 3 3 3 3 3 
    . 3 3 3 2 3 1 1 1 1 1 1 1 1 1 3 
    . . . . . 2 1 1 1 3 3 2 3 3 3 . 
    . . . . 3 1 3 1 3 1 2 . . . . . 
    . . . 3 1 3 2 1 3 3 1 3 . . . . 
    . . 3 1 3 . 2 1 3 . 3 1 3 . . . 
    . . 3 3 . . 3 1 3 . . 3 3 . . . 
    . . . . . . 3 1 3 . . . . . . . 
    . . . . . . 3 1 3 . . . . . . . 
    . . . . . . 3 3 . . . . . . . . 
    `, SpriteKind.Projectile)
fireball.setFlag(SpriteFlag.Invisible, true)
angle = 0
tiles.setCurrentTilemap(tilemap`level2`)
effects.starField.startScreenEffect()
apple = sprites.create(img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `, SpriteKind.Player)
let engine = sprites.create(img`
    7 3 
    3 7 
    `, SpriteKind.rocketengine)
scene.cameraFollowSprite(apple)
scaling.scaleByPercent(apple, -25, ScaleDirection.Uniformly, ScaleAnchor.Middle)
apple.ay = 20
let myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
let minimap2 = sprites.create(minimap.getImage(myMinimap), SpriteKind.map)
game.onUpdate(function () {
    fuelSprite.destroy()
    fuelSprite = textsprite.create(convertToText(fuel))
    fuelSprite.setPosition(apple.x, apple.top)
    minimap2.destroy()
    myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
    minimap.includeSprite(myMinimap, apple, MinimapSpriteScale.MinimapScale)
    minimap2 = sprites.create(minimap.getImage(myMinimap), SpriteKind.map)
    minimap2.setPosition(apple.x - 50, apple.y - 30)
    engine.setPosition(apple.x + -8 * Math.cos(angle), apple.y + -8 * Math.sin(angle))
    fireball.setPosition(apple.x + -8 * Math.cos(angle), apple.y + -8 * Math.sin(angle))
    if (rocketflag == 1) {
        fuel += -1
    }
    if (apple.y < 150) {
        landingflag = 0
    }
})
