const setup = module.exports;

class Setup {
    user = "root";
    password = "";
    database = "reele_db";
    host = "localhost";

    constructor() {
        return {host: this.host, user: this.user, password: this.password, database: this.database};
    }
}

setup.database = new Setup();
setup.port = 8000;
setup.ip = "localhost";
setup.tokenset = "d96350f02bfe4e6e7547857ce90b0decacd55e5a162ae906240a47a61d15da4f173c95bb3ae9ed613c04ce8faa922b4700d560ec1d77089b0fbf0205bed7af6566cfec106bd5e5f94214c4b673a6432a10252850a97cb9048d0a3e6c8d87b8676cafd06f77b4e2ceb20e019131138de66514f46d267c88899c3119d9830f35068f3b35d8d7637e00306115edaed59c61d5ec9894148141bb5fb25fbff7a1c7d9";