#! /usr/bin/perl

=head1 NAME

highscores.cgi - display the top twenty scores for the gta
game

=head1 SYNOPSIS

highscores.cgi

=head1 DESCRIPTION

highscores.cgi displays the contents of the F<scores> file. The
top twenty total scores are extracted from the file and stored.
The F<scoretemplate> file is then read. When the B<score_replace>
tag is found the high scores data is inserted. The whole resulting
html file is output.

Modified by Nic G 19/03/98.
Added $filepath global.

=cut

use strict;
use CGI;
use IO::File;
use English;
require 'getcwd.pl';


# Scores file.
my $scoresfile = 'scores.txt';

# Errors should return this file.
my $errorfile = 'errors.html';

# Errors should be logged to this file.
my $errorlog = 'scores.dbg';

# Number of attempts to open file.
my $maxtries = 20;

# Field separator in the score file.
my $fieldsep = "\|";

# Highest index in scores array to return (note that this is
# the number of scores to display minus one).
my $highcount = 199;

# Scores template file.
my $scoretemplate = 'highscores.html';

# Tag to be replaced in above.
my $score_replace = '<om_high_scores>';

# Sprintf string for output of each score line.
my $outline = "<TR>
<TD VALIGN=top HEIGHT=20 ALIGN=right><FONT FACE=\"Arial, Helvetica\" SIZE=2><B>%s</B></FONT></TD>
<TD VALIGN=top ALIGN=left><FONT FACE=\"Arial, Helvetica\" SIZE=2>%s</FONT></TD>
<TD VALIGN=top ALIGN=right><FONT FACE=\"Arial, Helvetica\" SIZE=2>%s</FONT></TD>
<TD VALIGN=top ALIGN=right><FONT FACE=\"Arial, Helvetica\" SIZE=2>%s</FONT></TD>
<TD VALIGN=top ALIGN=right><FONT FACE=\"Arial, Helvetica\" SIZE=2>%s</FONT></TD>
<TD VALIGN=top ALIGN=right><FONT FACE=\"Arial, Helvetica\" SIZE=2>%s</FONT></TD>
<TD VALIGN=top ALIGN=right><FONT FACE=\"Arial, Helvetica\" SIZE=2>%s</FONT></TD>
<TD VALIGN=top ALIGN=right><FONT FACE=\"Arial, Helvetica\" SIZE=2>%s</FONT></TD>
</TR>";

# Global cgi object.
my $cgi = new CGI;


# Get the path to the script. This is then used to set the
# path to all the files!
my $filepath = cgi_path();


###########################################################
# LogError
#
# Parameters:
#	list of strings to be written to error log.
# Returns:
#	N/A
# Actions:
#	opens the error log for appending and writes all the
#	strings supplied to the file separated by commas.
# 	prefixes with the time. Appends the client ip and
# 	browser (user agent string).

sub LogError
{
	# Get time and user agent.
	my $agent = $cgi->user_agent();
	my $ltime = time;

	# Open file, return if not possible.
	open ERRLOG, ">>$filepath$errorlog";
	
#	my $fh = new IO::File($filepath . $errorlog, ">>");
#	return unless $fh;

	# Output the log.
	my $output = join(",", $ltime, @_, $agent, $!);
	print ERRLOG "$output\n";

#	$fh->print($output, "\n");

	close ERRLOG; 

	# Done.
#	undef $fh;
}


###########################################################
# HandleError
#
# Returns the error page and exits.
# Parameters:
#	none.
# Returns:
#	the error page.

sub HandleError
{
	my $filename = $filepath . $errorfile;
	my $file = new IO::File($filename, "<");

	# If we can't open it fall back to dumb stuff.
	unless ($file)
	{
		print $cgi->header(-expires => 'now');
		print $cgi->start_html(-title => "Error!");
		print "<P><B>An error has occurred!</B></P>";
		print "<P>$filename</P>";
		print $cgi->end_html();
		exit 0;
	}

	# Print out the file.
	print $cgi->header();
	my $line;
	while ($line = <$file>)
	{
		print $line;
	}

	print "\n";

	# Done.
	undef $file;
	exit 0;
}


###########################################################
# GetScores.
#
# Reads the scores file. For each line in the score file,
# calculates the total score and generates a record for it.
# Returns a list holding the highest B<highcount> records.
# Parameters:
#	none.
# Returns:
#	list of high scores. Doesn't return on error.

sub GetScores
{
	my $filehandle = undef;
	my $res;
	my $ntries = 0;
	my @scores;

	# Loop until try count exceeded.
	while ($ntries < $maxtries)
	{
		$ntries++;
			
		# Sleep if scores file doesn't exist.
		sleep 1 unless -f $scoresfile;

		$filehandle = new IO::File($filepath . $scoresfile, "<");
		last if $filehandle;
	}

	unless ($filehandle)
	{
		LogError("Unable to open scores file", $scoresfile);
		HandleError;
	}

	my $line;
	while ($line = <$filehandle>)
	{
		chomp $line;
		my @scoreline = split(/\|/, $line);

		my $total = $scoreline[2] + $scoreline[3] + $scoreline[4] + $scoreline[5] + $scoreline[6];
		push @scores, [@scoreline[1..6], $total];
	}

	my @sorted = reverse sort {$a->[-1] <=> $b->[-1]} @scores;
	my $n = $#sorted > $highcount ? $highcount : $#sorted;
	return @sorted[0..$n];
}


###########################################################
# WriteScores
#
# Opens the high scores template and reads it. When the
# replacement tag is found, writes out the high scores in
# place of the tag.
# Parameters:
#	list of scores (from GetScores)
# Returns:
#	nothing

sub WriteScores
{
	my $filehandle = new IO::File($filepath . $scoretemplate, "<");
	unless ($filehandle)
	{
		LogError("Unable to open output template", $scoretemplate);
		HandleError();
	}

	# Position counter
	my $position=1;
	
	# Build the scores to be output.
	my $results = join("\n", map({sprintf($outline,$position++, @$_)} @_));

	# Start the output.
	print $cgi->header();

	my $line;
	while ($line = <$filehandle>)
	{
		$line =~ s/$score_replace/$results/;
		print $line;
	}
}



###########################################################
# cgi_path
#
# Nasty NT/IIS hack to make sure we have the correct path 
# for files.

sub cgi_path
{
	my @temp = split(/\\/, $cgi->path_translated());
	pop @temp;
	return join("\\", @temp) . "\\";
}


###########################################################
# "main"
#
# Calls GetScores and WriteScores.

my @scores = GetScores();
WriteScores(@scores);
