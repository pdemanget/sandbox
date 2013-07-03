/**
 * 
 */
package deltree.exec;

import org.javacc.parser.Main;

/**
 * @author .
 *
 */
public class JavaCc {

	public static void main(String[] args) throws Exception {
		Main.mainProgram(new String[] {
	            "-OUTPUT_DIRECTORY=./src/main/java/deltree/cc/gen",
	            "./src/main/resources/deltree/cc/src/test.jj"
	        });
	}
	
}
