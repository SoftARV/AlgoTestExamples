export default TestOne = function(input) {
  output = '';
  words = [];
  cases = [];

  lines = input.split('\n');
  l = parseInt(lines[0].split(' ')[0]);
  d = parseInt(lines[0].split(' ')[1]);
  n = parseInt(lines[0].split(' ')[2]);

  for (var x = 1; x <= d; x++) { words[x - 1] = lines[x]; }

  for (var i = d + 1; i <= d + n; i++) {
    cases[i - d - 1] = lines[i];
    tokens = cases[i - d - 1].match(/\([a-z]{2,}\)|[a-z]/g);
    possibs = 0;

    for (m = 0; m < d; m++) {

      for (var j = 0; j < l; j++) {

        match = false;
        tLen = tokens[j].length;
        for (k = 0; k < tLen; k++) {
          match = (words[m].charAt(j) == tokens[j].charAt(k))

          if (match)
            break;
        }
        if (!match)
          break;
      }
      possibs += match ? 1 : 0;
    }

    output += 'Case #' + (i - d) + ': ' + possibs + '\n';
  }
  return output;
}
