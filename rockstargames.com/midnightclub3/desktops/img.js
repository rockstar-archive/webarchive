function verifyImg(string) {
    var match = string.match(/^([a-zA-Z0-9 _-]+)$/);
    return match === null ? false : string;
}