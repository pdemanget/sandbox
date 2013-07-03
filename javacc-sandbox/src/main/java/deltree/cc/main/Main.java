package deltree.cc.main;

import deltree.cc.gen.ParseException;
import deltree.cc.gen.TestCC;

public class Main {
	public static void main(String[] args) {
		try {
			double sum = new TestCC("2.0+2.0").Sum();
			sum = new TestCC("2.0++++2.0").Sum();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
