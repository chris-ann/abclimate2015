"""
    Project for C3Creative
    Sept 29, 2014
    (C) Copyright 2014 Devin Sawatzky
"""
# ------------- SETTINGS -------------------------------------------------------
GRADIENT = float(42)
FIRST_ROW = 6
LAST_ROW = 66

#COLUMN INDEXES
COLS = {'fd': 2, 'gs': 3, 'hw': 8, 'xg25': 28, 'xl0': 30, 'ml25': 32}
GRADIENTS = {'fd': 46, 'gs': 24, 'hw': 47, 'xg25': 20, 'xl0': 44, 'ml25': 43}

DEBUG = False
# --------------- DON'T MAKE CHANGES BENEATH THIS LINE -----------------------------

import json
import os, sys
import inspect
from operator import sub

scriptpath = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))

def floatmap(item):
    return float(0) if item == '' else float(item)

class CSV(object):

    filename = None

    def __init__(self, filename):
        try:
            filestream = open("%s\\%s" % (scriptpath, filename))
        except:
            print "ERROR: Couldn't load CSV file '%s'" % filename
            return
        if DEBUG:
            print "SUCCESS Loading CSV file '%s'" % filename
        self.filename = filename
        self.data = filestream.read().split("\r")
        filestream.close()
        assert len(self.data) >= 67

    def style(self):
        result = {}
        t = self.trend()
        for (name, column) in COLS.items():
            result[name] = {'fillOpacity': round(1.0 / GRADIENTS[name] * abs(t[column]),2), 's': "p" if t[column]>0 else "n"}  # 's' variabile is storing if the trend was + or - (p or n)

        return result

    def blank_style(self):
        result = {}
        for (name, column) in COLS.items():
            result[name] = {'fillOpacity': 0.0, 's': 'p'}

        return result

    def row(self, index):
        return self.data[index]

    def trend(self):
        return map(sub, map(floatmap,self.row(LAST_ROW).split(',')), map(floatmap,self.row(FIRST_ROW).split(',')))

    def geoJSONprops(self):
        # returns the geoJSON properties that execute the shading
        if not self.filename:
            return self.blank_style()
        result = self.style()
        result.update({'clickable': True, 'csvfile': self.filename})
        return result


def dump_json(filename, json_obj):
    g = open("%s\%s" % (scriptpath, filename), 'w')
    # compress the dataset if not debugging, cut the whitespace
    json.dump(json_obj, g, indent=10 if DEBUG else None)
    g.close()

def gradient():
    """
        Bonus calculator, I used this to figure out what the global 'GRADIENTS' variable should be set at
    """
    print "Starting gradient calc"
    f = open("%s\\%s" % (scriptpath, 'AB_10K-ID.json'))
    geoJSONdata = f.read()
    f.close()
    j = json.loads(geoJSONdata)

    print "Processing CSVs... this may take a minute"

    results = {'fd': [], 'gs': [], 'hw': [], 'xg25': [], 'xl0': [], 'ml25': []}


    for feature in j['features']:
        csv_filename = "%s,%s.csv" % (feature['properties']['Lat'], feature['properties']['Lon'])
        csv_data = CSV(csv_filename)

        for (k,v) in results.items():
            t = csv_data.trend()
            results[k].append(t[COLS[k]])

    for (k,v) in results.items():
        print "'%s' RANGE: %f - %f" % (k, min(results[k]), max(results[k]))

def main():
    print "Starting"
    f = open("%s\\%s" % (scriptpath, 'AB_10K-ID.json'))
    geoJSONdata = f.read()
    f.close()

    j = json.loads(geoJSONdata)

    print "Processing CSVs... this may take a minute"
    for feature in j['features']:

        csv_filename = "%s,%s.csv" % (feature['properties']['Lat'], feature['properties']['Lon'])

        csv_data = CSV(csv_filename)

        feature['properties'].update(csv_data.geoJSONprops())

    print "If everything went perfectly you should have seen no messages above."
    print "Saving the dump to 'AB_10K-ID-MOD.json'"
    dump_json('AB_10K-ID-MOD.json', j)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == 'gradient':
            gradient()
    else:
        main()


