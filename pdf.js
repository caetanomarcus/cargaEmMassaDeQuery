const pdfMerge = require('pdf-merge');
const pdfTableExtractor = require('pdf-table-extractor');
const fs = require('fs');

const files = ['file1.pdf', 'file2.pdf', 'file3.pdf'];

pdfMerge(files, 'output.pdf', function(err){
    if(err) return console.log(err);
    console.log('Successfully merged PDF files!');

    pdfTableExtractor.extract('output.pdf', function (err, tables) {
        if (err) return console.log(err);
        console.log('Successfully extracted tables!');

        //Add code here to create a functional summary from the extracted tables

        //Save the new file with the summary
        fs.writeFile('output_with_summary.pdf', newFile, function(err) {
            if(err) return console.log(err);
            console.log('Successfully saved new file!');

            //Send the new file back to the user
            //Add code here to send the file to the user
        });
    });
});
