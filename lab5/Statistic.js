class Statistic
{
    constructor()
    {
        this.ssEnabled = false;
        this.startDate = '';
        this.finishDate = '-';
        this.requestsCount = 0;
        this.commitsCount = 0;
    }

    reset()
    {
        this.ssEnabled = true;
        this.startDate = '';
        this.finishDate = '-';
        this.requestsCount = 0;
        this.commitsCount = 0;
    }
};

module.exports = new Statistic();