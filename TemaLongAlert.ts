declare lower;
declare zerobase;

#=-=-=-=-=-=-=-=-=-=-=-=--=EMA LINES 15 min agg-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

def fif_price = close(period = ”15 min”);
def fif_ninelength = 9;
def fif_emanine = ExpAverage(fif_price, fif_ninelength);

input fif_twenyonelength = 21;
def fif_ematwenyone = ExpAverage(fif_price, fif_twenyonelength);


input fif_temalength = 50;
def fif_ema1 = ExpAverage(fif_price, fif_temalength);
def fif_ema2 = ExpAverage(fif_ema1, fif_temalength);
def fif_ema3 = ExpAverage(fif_ema2, fif_temalength);
def fif_TEMA = 3 * fif_ema1 - 3 * fif_ema2 + fif_ema3;

#=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-EMA LINES REG-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

def price = close;
def ninelength = 9;
def emanine = ExpAverage(price, ninelength);
def threelength = 3;
def emathree = ExpAverage (price, threelength);

input twenyonelength = 21;
def ematwenyone = ExpAverage(price, twenyonelength);


input temalength = 50;
def ema1 = ExpAverage(price, temalength);
def ema2 = ExpAverage(ema1, temalength);
def ema3 = ExpAverage(ema2, temalength);
def TEMA = 3 * ema1 - 3 * ema2 + ema3;

#=-=-=-=-=-=-=-=-=-=-=-=-=-=-VARIABLES-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

#def julo = (SecondsFromTime(0930) / 300) + 1;

def haclose = (open + high + low + close) / 4;

rec haopen = CompoundValue(1, (haopen[1] + haclose[1]) / 2, (open[1] + close[1]) / 2);

def haiopen = haopen;


def fif_haclose = (open(period = ”15 min”) + high(period = ”15 min”) + low(period = ”15 min”) + close(period = ”15 min”)) / 4;

rec fif_haopen = CompoundValue(1, (fif_haopen[1] + fif_haclose[1]) / 2, (open(period = ”15 min”)[1] + close(period = ”15 min”)[1]) / 2);


#=-=-=-=-=-=-=-=-=-=-=-=-=-=-QUART FUNCTION-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

def half = (haopen + haclose) / 2;
def quart = if haopen > haclose then (haclose + half) / 2 else (haopen + half) / 2;

#=-=-=-=-=-=-=-=-=-=-=-=-=-=-BUY SIGNAL-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

def AddOrder = if close > fif_emanine
and close > fif_ematwenyone
and close > fif_TEMA

and close > emanine
and close > ematwenyone
and close > TEMA

and emanine > quart



#and julo > 2
#and julo < 75

then 1 else 0;



#=-=-=-=-=-=-=-=-=-=-=-=-=-=-SELL SIGNAL-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=




def sell = if fif_haclose > fif_haopen and ((close) < fif_emanine)

or close < emanine
#or julo > 75
then 1 else 0;


def countb = if AddOrder[0] then 0 else countb[1] + 1;
def counta = if sell[0] then 0 else counta[1] + 1;

def b = countb;
def a = counta;


plot final = if a > b 
then 1 else 0;
